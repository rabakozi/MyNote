using System;
using MyNote.Api.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace MyNote.Api.Repositories
{
    public interface IAuditRepository
    {
        Task CreateNote(Note note);
        Task UpdateNote(Note note);
        Task DeleteNote(Note note);
        Task ShareNote(Note note);
        Task UnshareNote(Note note);
        Task RegisterUser(UserModel user, IdentityResult identityResult);
        Task LoginUser(UserModel user);
    }
}
