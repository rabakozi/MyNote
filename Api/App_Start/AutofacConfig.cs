using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;

namespace MyNote.Api
{
    public static class AutofacConfig
    {
        public static IContainer RegisterComponents(HttpConfiguration config)
        {
            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            //var logger = new Logger(new SelfLogger());
            //builder.RegisterInstance(logger).As<ILogger>().SingleInstance();

            builder.RegisterModule(new Repositories.AutofacModule());

            var container = builder.Build();

            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            return container;
        }

    }
}