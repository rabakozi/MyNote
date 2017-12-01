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
    [Authorize]
    [RoutePrefix("api/notes")]
    public class NotesController : ApiController
    {
        private readonly INotesRepository notesRepository;

        public NotesController(INotesRepository notesRepository)
        {
            this.notesRepository = notesRepository;
        }

        [Route("")]
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
        [Route("api/notes/{id}")]
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
        [Route("")]
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
        public async Task<IHttpActionResult> Delete(int id)
        {
            await notesRepository.Delete(id);
            return Ok();
        }

        /// <summary>
        /// Get specific note by read only direct link.
        /// </summary>
        /// <param name="accessLink"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Route("{accessLink}")]
        [ResponseType(typeof(Note))]
        public async Task<IHttpActionResult> GetByAccessLink(string accessLink)
        {
            Note note = await notesRepository.GetByAccessLink(accessLink);
            if (note == null)
            {
                return NotFound();
            }

            return Ok(note);
        }

        /// <summary>
        /// Create read only direct link to note.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("{id}/share")]
        [ResponseType(typeof(Note))]
        [HttpPost]
        public async Task<IHttpActionResult> CreateAccessLink(int id)
        {
            var note = await notesRepository.Get(id);
            if (note == null)
            {
                return NotFound();
            }

            if (note.ShareLink == null)
            {
                note.ShareLink = Guid.NewGuid().ToString("N").ToUpper();
                note.Modified = DateTime.Now;
                await notesRepository.Update(note);
            }

            return Ok(note);
        }

        /// <summary>
        ///  Delete note read only direct link.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("{id}/share")]
        [ResponseType(typeof(Note))]
        public async Task<IHttpActionResult> DeleteNoteAccessLink(int id)
        {
            var note = await notesRepository.Get(id);
            if (note == null)
            {
                return NotFound();
            }

            if (note.ShareLink != null)
            {
                note.ShareLink = null;
                note.Modified = DateTime.Now;
                await notesRepository.Update(note);
            }

            return Ok(note);
        }
    }
}
