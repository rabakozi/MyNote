using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using MyNote.Api.Model;

namespace MyNote.Api.Repositories
{
    class AuditRepository : IAuditRepository
    {
        private readonly MyNoteContext ctx;

        public AuditRepository()
        {
        }


        public async Task CreateNote(Note note)
        {
            await AuditNoteActions(note, AuditAction.CreateNote);
        }

        public async Task DeleteNote(Note note)
        {
            await AuditNoteActions(note, AuditAction.DeleteNote);
        }

        public async Task ShareNote(Note note)
        {
            await AuditNoteActions(note, AuditAction.ShareNote);
        }

        public async Task UnshareNote(Note note)
        {
            await AuditNoteActions(note, AuditAction.UnshareNote);
        }

        public async Task UpdateNote(Note note)
        {
            await AuditNoteActions(note, AuditAction.UpdateNote);
        }

        public async Task LoginUser(UserModel user)
        {
            throw new NotImplementedException();
        }

        public async Task RegisterUser(UserModel user, IdentityResult identityResult)
        {
            using (var ctx = new MyNoteContext())
            {
                var auditNote = new AuditEnrty()
                {
                    Action = Enum.GetName(typeof(AuditAction), AuditAction.RegisterUser),
                    Actor = user.UserName,
                    Time = DateTime.Now,
                    Details = identityResult.Succeeded ? "Success." :
                        string.Join("; ", identityResult.Errors)
                };

                ctx.AuditEntries.Add(auditNote);
                await ctx.SaveChangesAsync();
            }

        }


        private async Task AuditNoteActions(Note note, AuditAction action)
        {
            using (var ctx = new MyNoteContext())
            {
                var auditNote = new AuditEnrty()
                {
                    Action = Enum.GetName(typeof(AuditAction), action),
                    NoteId = note.Id,
                    Actor = note.Owner,
                    Time = DateTime.Now
                };

                switch(action)
                {
                    case AuditAction.CreateNote:
                    case AuditAction.UpdateNote:
                        auditNote.Details = $"Title:{note.Title}, Content:{note.Content}";
                        break;
                    case AuditAction.ShareNote:
                        auditNote.Details = $"ShareLink:{note.ShareLink}";
                        break;
                }

                ctx.AuditEntries.Add(auditNote);
                await ctx.SaveChangesAsync();
            }

        }
    }
}
