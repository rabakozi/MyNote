using Autofac;

namespace MyNote.Repositories
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder
                .RegisterType<StubNotesRepository>()
                .As<INotesRepository>()
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
