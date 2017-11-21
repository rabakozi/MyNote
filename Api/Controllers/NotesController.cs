using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using MyNote.Model;
using MyNote.Repositories;

namespace MyNote.Api.Controllers
{
    /// <summary>
    /// This controller implements Notes CRUD functionalities
    /// </summary>
    [RoutePrefix("api/notes")]
    public class NotesController : ApiController
    {
        private readonly INotesRepository notesRepository;

        public NotesController(INotesRepository notesRepository)
        {
            this.notesRepository = notesRepository;
        }

        /// <summary>
        /// Gets a Note by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Note</returns>
        [Route("{id}")]
        public Task<Note> Get(int id)
        {
            return notesRepository.Get(id);
        }

        /// <summary>
        /// Creates a new Note
        /// </summary>
        [HttpPost]
        public Task Post([FromBody]Note note)
        {
            return notesRepository.Insert(note);
        }

        /// <summary>
        /// Amends an existing Note
        /// </summary>
        [Route("{id}")]
        [HttpPut]
        public Task Put(int id, [FromBody]Note note)
        {
            note.Id = id;
            return notesRepository.Update(note);
        }

        /// <summary>
        /// Deletes a Note of a given Id
        /// </summary>
        [Route("{id}")]
        [HttpDelete]
        public Task Delete(int id)
        {
            return notesRepository.Delete(id);
        }

        ///// <summary>
        ///// Returns a list of Note digest of a user
        ///// </summary>
        ///// <returns>IEnumerable&lt;Note&gt;</returns>
        //[Route("{userId}")]
        //[HttpGet]
        public Task<IEnumerable<NoteDigest>> GetByUserId(int userId)
        {
            return notesRepository.GetAllNoteDigestByUserId(userId);
        }
    }
}
