using Chat.Entities;
using Chat.Entities.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Chat.Identity
{
  public class ApplicationUserStore : UserStore<User, Role, string, ApplicationUserLogin, ApplicationUserRole, ApplicationUserClaim>, IUserRoleStore<User, string>, IUserStore<User, string>
  {
    public ApplicationUserStore(DatabaseContext context)
        : base(context)
    {
    }

  }
}