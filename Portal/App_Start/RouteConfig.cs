
using System.Web.Mvc;
using System.Web.Routing;

namespace MyNote.Portal
{
  public class RouteConfig
  {
    public static void RegisterRoutes(RouteCollection routes)
    {
      // routes.MapRoute(
      //     name: "Default",
      //     url: "{controller}/{action}/{id}",
      //     defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
      //);

      routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

//      routes.MapRoute(
//    name: "Default",
//    url: "{*anything}",
//    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }


//);

      routes.MapRoute(
     "Default", // Route name
     "{controller}/{action}/{id}", // URL with parameters
     new { controller = "Home", action = "Index", id = UrlParameter.Optional }, // Parameter defaults
     new string[] { "MyNote.Portal.Controllers" }
);

      //routes.Add(new Route(
      //            "{controller}/{action}/{id}",
      //            new RouteValueDictionary(new
      //            {
      //              controller = "Home",
      //              action = "Index",
      //              id = UrlParameter.Optional
      //            }),
      //            new ControllerLessRouteHandler()
      //            )
      //            );
    }
  }
}