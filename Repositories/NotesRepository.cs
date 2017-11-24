using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyNote.Model;
using MyNote.DAL;
using System.Linq;
using System.Data.Entity;

namespace MyNote.Repositories
{
    public class NotesRepository : INotesRepository
    {
        private readonly DatabaseContext ctx;

        public NotesRepository()
        {
            //ctx = dbContextFactory.CreateDbContext(null);
        }

        public Task<Note> Get(int id)
        {
            using (var ctx = new DatabaseContext())
            {
                return ctx.Notes.FindAsync(id);
            }
        }

        public async Task<IEnumerable<NoteDigest>> GetAllNoteDigestByUserId(int userId)
        {
            using (var ctx = new DatabaseContext())
            {
                var notes = await ctx.Notes.Where(n => n.UserId == userId).ToListAsync();
                return (IEnumerable<Note>)notes;
            }
        }

        public Task Insert(Note note)
        {
            using (var ctx = new DatabaseContext())
            {
                note.Created = note.Modified = DateTime.Now;
                //TODO: return Id
                ctx.Notes.Add(note);
                //((DbSet<Note>)ctx.Set<Note>())
                //    .Add(note);

                return ctx.SaveChangesAsync();
            }
        }

        public Task Update(Note note)
        {
            using (var ctx = new DatabaseContext())
            {
                //var dbNote = ctx.Notes.First(u => u.Id == note.Id);
                //note.Created = dbNote.Created;
                //note.Modified = DateTime.Now;
                //ctx.Entry(dbNote).CurrentValues.SetValues(note);
                //return ctx.SaveChangesAsync();

                var dbNote = ctx.Notes.Find(note.Id);
                dbNote.Lead = note.Lead;
                dbNote.Modified = DateTime.Now;
                dbNote.ShareLink = note.ShareLink;
                dbNote.Title = note.Title;
                return ctx.SaveChangesAsync();
            }
        }

        public Task Delete(int id)
        {
            using (var ctx = new DatabaseContext())
            {
                var note = ctx.Notes.Find(id);
                ctx.Notes.Remove(note);
                //var note = ctx.Notes.First(n => n.Id == id);
                //ctx.Remove(note);
                return ctx.SaveChangesAsync();
            }
        }
    }
}
