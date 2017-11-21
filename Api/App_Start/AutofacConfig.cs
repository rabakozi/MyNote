using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using SB.Logging;
using SB.Logging.Self;

namespace SB.BetTracer2.Api.Host
{
    public static class AutofacConfig
    {
        public static IContainer RegisterComponents(HttpConfiguration config)
        {
            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            var logger = new Logger(new SelfLogger());
            builder.RegisterInstance(logger).As<ILogger>().SingleInstance();

            builder.RegisterModule(new Infrastructure.BetTracer2BetHistory.AutofacModule());
            builder.RegisterModule(new Api.BusinessLogic.AutofacModule());


            var container = builder.Build();

            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            return container;
        }

    }
}