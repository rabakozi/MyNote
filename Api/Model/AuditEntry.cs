using System;
using System.ComponentModel.DataAnnotations;

namespace MyNote.Api.Model
{
    public class AuditEnrty
    {
        [Key]
        public long Id { get; set; }

        public string Actor { get; set; }

        public DateTime Time { get; set; }

        public string Details { get; set; }

        public string TargetType { get; set; } // User, Note

        public int NoteId { get; set; }  // TargetId

        public string Action { get; set; } // Insert, Update, Delete, Share, Unshare, Register, Login
    }
}