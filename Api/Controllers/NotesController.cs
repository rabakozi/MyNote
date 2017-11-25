using MyNote.Api.Model;
using MyNote.Api.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

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

        [HttpGet]
        public async Task<IEnumerable<NoteDigest>> GetAll()
        {
            return await notesRepository.GetAllNoteDigestByUserId(1);
        }

        /// <summary>
        /// Gets a Note by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Note</returns>
        [Route("{id}")]
        [HttpGet]
        public async Task<Note> Get(int id)
        {
            var note = await notesRepository.Get(id);
            return note; //notesRepository.Get(id);
        }

        /// <summary>
        /// Creates a new Note
        /// </summary>
        [HttpPost]
        public async Task Post([FromBody]Note note)
        {
            await notesRepository.Insert(note);
        }

        /// <summary>
        /// Amends an existing Note
        /// </summary>
        [Route("{id}")]
        [HttpPut]
        public async Task Put(int id, [FromBody]Note note)
        {
            note.Id = id;
            await notesRepository.Update(note);
        }

        /// <summary>
        /// Deletes a Note of a given Id
        /// </summary>
        [Route("{id}")]
        [HttpDelete]
        public async Task Delete(int id)
        {
            await notesRepository.Delete(id);
        }

        ///// <summary>
        ///// Returns a list of Note digest of a user
        ///// </summary>
        ///// <returns>IEnumerable&lt;Note&gt;</returns>
        //[Route("{userId}")]
        //[HttpGet]
        //public async Task<IEnumerable<NoteDigest>> GetByUserId(int userId)
        //{
        //    return await notesRepository.GetAllNoteDigestByUserId(userId);
        //}
    }
}
