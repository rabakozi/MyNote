using System.Web.Http;
using Owin;

namespace MyNote.Api
{
    public class Startup
    {
        // This code configures Web API. The Startup class is specified as a type
        // parameter in the WebApp.Start method.
        public void Configuration(IAppBuilder appBuilder)
        {
            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();

            WebApiConfig.Register(config);
            SwaggerConfig.Register(config);

            // Setup IoC container
            var container = AutofacConfig.RegisterComponents(config);

            appBuilder.UseAutofacMiddleware(container);
            appBuilder.UseAutofacWebApi(config);
            appBuilder.UseWebApi(config);
        }
    }
}
