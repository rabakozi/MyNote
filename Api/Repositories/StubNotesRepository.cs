using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyNote.Api.Model;

namespace MyNote.Api.Repositories
{
    public class StubNotesRepository : INotesRepository
    {

        private List<Note> notes = new List<Note>
        {
            new Note
            {
                Id = 1,
                UserId = 1,
                Title = "First Title",
                Lead = "First lead text",
                Content =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean iaculis mattis bibendum. Fusce ut ornare neque. Etiam luctus est vulputate tellus auctor placerat. Vivamus a purus urna. Nunc fermentum euismod tellus at blandit. Nam vulputate sapien nunc, ut tincidunt odio elementum a. In bibendum molestie magna in sodales.",
                Created = new DateTime(2017,11,11,12,23,0),
            },
            new Note
            {
                Id = 2,
                UserId = 1,
                Title = "Second Title",
                Lead = "Second lead text",
                Content =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vestibulum auctor cursus. Cras ultrices ligula metus, ut fermentum nisl rutrum id. In vehicula sit amet velit malesuada rhoncus. Nam porta turpis dolor. Praesent ullamcorper bibendum lacus, vel sollicitudin libero aliquet eget. Donec dignissim nisl id nunc pretium, eget posuere neque vulputate. Nulla nunc est, placerat a lacus in, eleifend elementum ligula. In ut dolor massa. Integer ut dictum lectus, ac pretium diam. Ut in ornare metus. Etiam at metus scelerisque, sollicitudin erat ac, fringilla lorem. Aenean et volutpat ante, quis vestibulum dui.",
                Created = new DateTime(2017,10,05,12,23,0)
            },
            new Note
            {
                Id = 3,
                UserId = 1,
                Title = "Third Title",
                Lead = "Third lead text",
                Content =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus est at mi eleifend pulvinar. Vestibulum eget mauris elementum mi rhoncus facilisis. Donec convallis eget purus at mollis. Nullam blandit elementum libero, eu laoreet leo aliquam eu. In et tempus augue. Ut facilisis facilisis bibendum. Sed hendrerit lorem nunc, vel porta metus pulvinar ut. Duis eu varius ante. Fusce vitae massa et erat vulputate porta et at nibh. In justo mauris, auctor a ullamcorper ac, bibendum eu nibh. Aliquam placerat consequat feugiat. Ut auctor in massa nec feugiat. Pellentesque orci velit, elementum eget arcu quis, maximus bibendum libero. Proin viverra congue ex, et eleifend lorem. Ut mi tortor, pellentesque ac erat eget, condimentum pellentesque nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                Created = new DateTime(2015,11,11,12,23,0)
            },
            new Note
            {
                Id = 4,
                UserId = 1,
                Title = "Fourth Title",
                Lead = "Fourth lead text",
                Content =
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus est at mi eleifend pulvinar. Vestibulum eget mauris elementum mi rhoncus facilisis. Donec convallis eget purus at mollis. Nullam blandit elementum libero, eu laoreet leo aliquam eu. In et tempus augue. Ut facilisis facilisis bibendum. Sed hendrerit lorem nunc, vel porta metus pulvinar ut. Duis eu varius ante. Fusce vitae massa et erat vulputate porta et at nibh. In justo mauris, auctor a ullamcorper ac, bibendum eu nibh. Aliquam placerat consequat feugiat. Ut auctor in massa nec feugiat. Pellentesque orci velit, elementum eget arcu quis, maximus bibendum libero. Proin viverra congue ex, et eleifend lorem. Ut mi tortor, pellentesque ac erat eget, condimentum pellentesque nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                Created = new DateTime(2017,11,11,1,10,12)
            }
        };


        public Task<Note> Get(int id)
        {
            return Task.Run(() => notes.First(n => n.Id == id));
        }

        public Task<IEnumerable<NoteDigest>> GetAllNoteDigestByUserId(int userId)
        {
            return Task.Run(() => notes.Where(n => n.UserId == userId).Select(n => (NoteDigest)n));
        }

        public Task Insert(Note note)
        {
            note.Created = note.Modified = DateTime.Now;

            notes.Add(note);

            return Task.CompletedTask;
        }

        public Task Update(Note note)
        {
            var dbNote = notes.First(u => u.Id == note.Id);
            var created = dbNote.Created;
            dbNote = note;
            dbNote.Created = created;
            return Task.CompletedTask;
        }

        public Task Delete(int id)
        {
            var note = notes.First(n => n.Id == id);
            notes.Remove(note);
            return Task.CompletedTask;
        }

        public Task<Note> GetByAccessLink(string accessLink)
        {
            throw new NotImplementedException();
        }
    }
}
