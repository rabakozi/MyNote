using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyNote.Api.Model
{
    public class NoteDigest
    {
        [Key]
        public int Id { get; set; }
        //[ForeignKey("User")]
        public int UserId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public string Title { get; set; }
        public string Lead { get; set; }
        public string ShareLink { get; set; }
    }
}
