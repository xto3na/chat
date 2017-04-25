using System;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;
using Chat.Entities.Interfaces;

namespace Chat.Entities.Identity
{
  public abstract class ApplicationUser : IdentityUser<string, ApplicationUserLogin, ApplicationUserRole, ApplicationUserClaim>, IUser<string>, IEntity
  {
   
  }
}