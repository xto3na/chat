using System;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Chat.Entities.Identity
{
  public abstract class ApplicationRole : IdentityRole<string, ApplicationUserRole>
  {
  }
}