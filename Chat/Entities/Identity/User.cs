using Chat.Entities.Interfaces;
using Chat.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Chat.Entities.Identity
{
  [Table("Users")]
  public class User : ApplicationUser, IEntity
  {
    #region Properties
    public string ConnectionId { get; set; }
    public DateTime RegisterAt { get; set; }

    #endregion

    #region Navigation Properties

    [InverseProperty("User")]
    public virtual Profile Profile { get; set; }

    public async Task<ClaimsIdentity> GenerateUserIdentityAsync(ApplicationUserManager manager, string authentificationType)
    {
      // Note the authenticationType must match the one 
      // defined in CookieAuthenticationOptions.AuthenticationType
      var userIdentity =
          await manager.CreateIdentityAsync(this, authentificationType);
      // Add custom user claims here
      return userIdentity;
    }

    #endregion
  }
}