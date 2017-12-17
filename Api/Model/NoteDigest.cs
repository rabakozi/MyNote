using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyNote.Api.Model
{
    public class NoteDigest
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(256)]
        public string Owner { get; set; }

        public DateTime Created { get; set; }

        public DateTime Modified { get; set; }

        [MaxLength(256)]
        public string ModifiedBy { get; set; }

        [MaxLength(1024)]
        public string Title { get; set; }

        [MaxLength(256)]
        public string Lead { get; set; }

        [MaxLength(128)]
        public string ShareLink { get; set; }
    }
}
