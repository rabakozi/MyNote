using Autofac;
using MyNote.Api.Repositories;

namespace MyNote.Api
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder
                .RegisterType<NotesRepository>()
                .As<INotesRepository>()
                .SingleInstance();
            builder
                .RegisterType<AuditRepository>()
                .As<IAuditRepository>()
                .SingleInstance();
            //builder
            //    .RegisterType<UsersRepository>()
            //    .As<IUsersRepository>()
            //    .SingleInstance();

            //builder.RegisterModule(new DataAccess.AutofacModule());
        }

        ////
        //// Helper methods
        ////
        //private void RegisterDbContextFactory<TDbContextFactory, TIDbContextFactory>(ContainerBuilder builder)
        //{
        //    builder
        //        .RegisterType<TDbContextFactory>()
        //        .As<TIDbContextFactory>()
        //        .InstancePerDependency();
        //}
    }
}
