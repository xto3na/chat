using Chat.Entities;
using Chat.Entities.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace Chat.Identity
{
  public class ApplicationUserManager : UserManager<User, string>
  {
    public ApplicationUserManager(IUserRoleStore<User, string> userStore)
        : base(userStore)
    {

    }

    public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
    {
      var manager = new ApplicationUserManager(new ApplicationUserStore(context.Get<DatabaseContext>()));
      // Configure validation logic for usernames
      manager.UserValidator = new UserValidator<User, string>(manager)
      {
        AllowOnlyAlphanumericUserNames = false,
        RequireUniqueEmail = true
      };
      // Configure validation logic for passwords
      manager.PasswordValidator = new PasswordValidator
      {
        RequiredLength = 4,
        RequireNonLetterOrDigit = false,
        RequireDigit = false,
        RequireLowercase = false,
        RequireUppercase = false
      };
      var dataProtectionProvider = options.DataProtectionProvider;
      if (dataProtectionProvider != null)
      {
        manager.UserTokenProvider = new DataProtectorTokenProvider<User, string>(dataProtectionProvider.Create("ASP.NET Identity"));
      }
      return manager;
    }
  }
}