using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Chat.Handlers;

namespace Chat
{
	public class RouteConfig
	{
		public static void RegisterRoutes(RouteCollection routes)
		{
      //routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

      //routes.MapRoute(
      //		name: "Default",
      //		url: "{controller}/{action}/{id}",
      //		defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
      //);
      // This all for default file 
      routes.RouteExistingFiles = true;
      routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
      routes.IgnoreRoute("");
      Route newRoute = new Route("{controller}/", new RouteHandler());
      routes.Add(newRoute);
    }
	}
}
