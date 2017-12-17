namespace MyNote.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Audit : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AuditEnrties",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        Actor = c.String(),
                        Time = c.DateTime(nullable: false),
                        Details = c.String(),
                        TargetType = c.String(),
                        NoteId = c.Int(nullable: false),
                        Action = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Notes", "Owner", c => c.String(nullable: false, maxLength: 256));
            AddColumn("dbo.Notes", "ModifiedBy", c => c.String(maxLength: 256));
            DropColumn("dbo.Notes", "UserId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Notes", "UserId", c => c.Int(nullable: false));
            DropColumn("dbo.Notes", "ModifiedBy");
            DropColumn("dbo.Notes", "Owner");
            DropTable("dbo.AuditEnrties");
        }
    }
}
