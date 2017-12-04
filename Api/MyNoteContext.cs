using Microsoft.AspNet.Identity.EntityFramework;
using MyNote.Api.Model;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Microsoft.WindowsAzure.ServiceRuntime;
using Microsoft.WindowsAzure.Storage;

namespace MyNote.Api
{
    public class MyNoteContext : IdentityDbContext<IdentityUser>
    {

        public MyNoteContext() : base(RoleEnvironment.GetConfigurationSettingValue("MyNoteContext"))
        {
        }

        public DbSet<Note> Notes { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        //}
    }
}