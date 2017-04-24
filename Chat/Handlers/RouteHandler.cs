using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;

namespace Chat.Handlers
{
    public class RouteHandler : IRouteHandler
    {
      public IHttpHandler GetHttpHandler(RequestContext requestContext)
      {
        requestContext.HttpContext.Response.Redirect("#" + requestContext.HttpContext.Request.FilePath);
        return new MyHttpHandler();
      }
    }

    public class MyHttpHandler : IHttpHandler
    {
      public bool IsReusable
      {
        get { return false; }
      }

      public void ProcessRequest(HttpContext context)
      {
        context.Response.Write("Инопланетное послание");
      }
    }
}