using MyNote.Api.Model;
using MyNote.Api.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

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
        [ResponseType(typeof(IEnumerable<NoteDigest>))]
        public async Task<IHttpActionResult> GetAll()
        {
            var noteList = await notesRepository.GetAllNoteDigestByUserId(1);
            return Ok(noteList);
        }

        /// <summary>
        /// Gets a Note by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Note</returns>
        [Route("{id}")]
        [HttpGet]
        [ResponseType(typeof(Note))]
        public async Task<IHttpActionResult> Get(int id)
        {
            var note = await notesRepository.Get(id);
            if (note == null)
            {
                return NotFound();
            }
            return Ok(note);
        }

        /// <summary>
        /// Creates a new Note
        /// </summary>
        [HttpPost]
        [ResponseType(typeof(Note))]
        public async Task<IHttpActionResult> Post([FromBody]Note note)
        {
            await notesRepository.Insert(note);
            return Ok(note);
        }

        /// <summary>
        /// Amends an existing Note
        /// </summary>
        [Route("{id}")]
        [HttpPut]
        [ResponseType(typeof(Note))]
        public async Task<IHttpActionResult> Put(int id, [FromBody]Note note)
        {
            note.Id = id;
            await notesRepository.Update(note);
            return Ok(note);
        }

        /// <summary>
        /// Deletes a Note of a given Id
        /// </summary>
        [Route("{id}")]
        [HttpDelete]
        public async Task<IHttpActionResult> Delete(int id)
        {
            await notesRepository.Delete(id);
            return Ok();
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
