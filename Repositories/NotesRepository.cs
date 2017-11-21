//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;
//using MyNote.Model;

//namespace MyNote.Repositories
//{
//    public class NotesRepository : INotesRepository
//    {
//        private readonly DatabaseContext ctx;

//        public NotesRepository(IDesignTimeDbContextFactory<DatabaseContext> dbContextFactory)
//        {
//            ctx = dbContextFactory.CreateDbContext(null);
//        }

//        public Task<Note> Get(int id)
//        {
//            return ctx.Notes.FirstAsync(n => n.Id == id);
//        }

//        public async Task<IEnumerable<NoteDigest>> GetAllNoteDigestByUserId(int userId)
//        {
//            var notes = await ctx.Notes.Where(n => n.UserId == userId).ToListAsync();
//            return (IEnumerable<Note>)notes;
//        }

//        public Task Insert(Note note)
//        {
//            note.Created = note.Modified = DateTime.Now;
//            //TODO: return Id
//            ((DbSet<Note>)ctx.Set<Note>())
//                .Add(note);

//            return ctx.SaveChangesAsync();
//        }

//        public Task Update(Note note)
//        {
//            var dbNote = ctx.Notes.First(u => u.Id == note.Id);
//            note.Created = dbNote.Created;
//            note.Modified = DateTime.Now;
//            ctx.Entry(dbNote).CurrentValues.SetValues(note);
//            return ctx.SaveChangesAsync();
//        }

//        public Task Delete(int id)
//        {
//            var note = ctx.Notes.First(n => n.Id == id);
//            ctx.Remove(note);
//            return ctx.SaveChangesAsync();
//        }
//    }
//}
