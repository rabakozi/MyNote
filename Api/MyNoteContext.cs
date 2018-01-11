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

        // before deployment:
        public MyNoteContext() : base(RoleEnvironment.GetConfigurationSettingValue("MyNoteContext"))
        // locally    
        //public MyNoteContext() : base(("MyNoteContext"))
        {
            string connString;

            //try
            //{
            //    connString = RoleEnvironment.GetConfigurationSettingValue("MyNoteContext");
            //}
            //catch
            //{
             //   connString = "MyNoteContext";
            //}

           // Database.Connection  = new  = connString;
        }

        public DbSet<Note> Notes { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<AuditEnrty> AuditEntries { get; set; }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        //}
    }
}