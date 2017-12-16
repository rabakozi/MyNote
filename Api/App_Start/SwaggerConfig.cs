using System;
using System.IO;
using System.Reflection;
using System.Web.Http;
using Swashbuckle.Application;

namespace MyNote.Api
{
    public class SwaggerConfig
    {
        public static void Register(HttpConfiguration configuration)
        {
            var thisAssembly = typeof(SwaggerConfig).Assembly;
            configuration
                .EnableSwagger(c =>
                {
                    var baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
                    var commentsFileName = Assembly.GetExecutingAssembly().GetName().Name + ".XML";
                    var commentsFile = Path.Combine(baseDirectory, "App_Data", commentsFileName);

                    c.SingleApiVersion("v1", "MyNote.Api");
                    c.IncludeXmlComments(commentsFile);

                })
                .EnableSwaggerUi(c =>
                {
                    //c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                });
        }
    }
}
