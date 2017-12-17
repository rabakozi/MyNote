using System;
using MyNote.Api.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyNote.Api.Repositories
{
    public interface INotesRepository
    {
        Task<Note> Get(int id);
        Task<Note> GetByAccessLink(string accessLink);
        Task<IEnumerable<NoteDigest>> GetAllNoteDigestByUser(string userName);
        Task Update(Note note);
        Task Insert(Note note);
        Task Delete(int id);
    }
}
