using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyNote.Api.Model;
using System.Linq;
using System.Data.Entity;

namespace MyNote.Api.Repositories
{
    public class NotesRepository : INotesRepository
    {
        private readonly MyNoteContext ctx;

        public NotesRepository()
        {
            //ctx = dbContextFactory.CreateDbContext(null);
        }

        public async Task<Note> Get(int id)
        {
            using (var ctx = new MyNoteContext())
            {
                return await ctx.Notes.FindAsync(id);
            }
        }

        public async Task<Note> GetByAccessLink(string accessLink)
        {
            using (var ctx = new MyNoteContext())
            {
                return await ctx.Notes.Where(n => n.ShareLink == accessLink).FirstAsync();
            }
        }

        public async Task<IEnumerable<NoteDigest>> GetAllNoteDigestByUserId(int userId)
        {
            using (var ctx = new MyNoteContext())
            {
                var notes = await ctx.Notes.Where(n => n.UserId == userId).ToListAsync();
                return (IEnumerable<Note>)notes;
            }
        }

        public async Task Insert(Note note)
        {
            using (var ctx = new MyNoteContext())
            {
                note.Created = note.Modified = DateTime.Now;
                //TODO: return Id
                //ctx.Notes.Add(note);
                var zzz = ((DbSet<Note>)ctx.Set<Note>())
                    .Add(note);

                await ctx.SaveChangesAsync();
            }
        }

        public async Task Update(Note note)
        {
            using (var ctx = new MyNoteContext())
            {
                var dbNote = ctx.Notes.First(u => u.Id == note.Id);
                note.Created = dbNote.Created;
                note.Modified = DateTime.Now;
                ctx.Entry(dbNote).CurrentValues.SetValues(note);
                await ctx.SaveChangesAsync();

                //var dbNote = ctx.Notes.Find(note.Id);
                //dbNote.Lead = note.Lead;
                //dbNote.Modified = DateTime.Now;
                //dbNote.ShareLink = note.ShareLink;
                //dbNote.Title = note.Title;
                //return ctx.SaveChangesAsync();
            }
        }

        public async Task Delete(int id)
        {
            using (var ctx = new MyNoteContext())
            {
                var note = ctx.Notes.Find(id);
                ctx.Notes.Remove(note);
                //var note = ctx.Notes.First(n => n.Id == id);
                //ctx.Remove(note);
                await ctx.SaveChangesAsync();
            }
        }
    }
}
