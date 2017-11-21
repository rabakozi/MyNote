using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

        //public static void Register(HttpConfiguration configuration)
        //{
        //    // we only need to change the default constraint resolver for services that want urls with versioning like: ~/v{version}/{controller}
        //    var constraintResolver = new DefaultInlineConstraintResolver() { ConstraintMap = { ["apiVersion"] = typeof(ApiVersionRouteConstraint) } };

        //    // reporting api versions will return the headers "api-supported-versions" and "api-deprecated-versions"
        //    configuration.AddApiVersioning(o => o.ReportApiVersions = true);
        //    configuration.MapHttpAttributeRoutes(constraintResolver);

        //    // redirect defult route to swagger ui
        //    configuration.Routes.MapHttpRoute(
        //        name: "Swagger UI",
        //        routeTemplate: "",
        //        defaults: null,
        //        constraints: null,
        //        handler: new RedirectHandler(SwaggerDocsConfig.DefaultRootUrlResolver, "swagger/ui/index"));

        //    // use only json results
        //    var json = configuration.Formatters.JsonFormatter;
        //    json.UseDataContractJsonSerializer = true;
        //    configuration.Formatters.Remove(configuration.Formatters.XmlFormatter);
        //}
    }
}
