namespace MyNote.Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modify_audit : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.AuditEnrties", "TargetType");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AuditEnrties", "TargetType", c => c.String());
        }
    }
}
