using System.Collections.Generic;
using System.Threading.Tasks;
using MyNote.Model;

namespace MyNote.Repositories
{
    public interface INotesRepository
    {
        Task<Note> Get(int id);
        Task<IEnumerable<NoteDigest>> GetAllNoteDigestByUserId(int userId);
        Task Update(Note note);
        Task Insert(Note note);
        Task Delete(int id);
    }
}
