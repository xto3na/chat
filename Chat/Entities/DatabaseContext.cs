using Chat.Entities.Identity;
using System.Data.Entity;

namespace Chat.Entities
{
  public class DatabaseContext : DbContext
  {
    #region Entities

    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Role> Roles { get; set; }
    public virtual DbSet<Profile> Profiles { get; set; }

    #endregion

    #region Ctors

    public DatabaseContext()
        : base("chat_db")
    {
      Configuration.LazyLoadingEnabled = false;
    }

    #endregion

    #region Fluent API

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {

      modelBuilder.Entity<ApplicationUserLogin>()
          .HasKey(login => login.UserId);
      modelBuilder.Entity<ApplicationUserRole>()
          .HasKey(role => new { role.UserId, role.RoleId });

      modelBuilder.Entity<User>()
          .HasKey(user => user.Id)
          .HasRequired(user => user.Profile)
          .WithRequiredPrincipal();

      base.OnModelCreating(modelBuilder);
    }

    #endregion

    public static DatabaseContext Create()
    {
      return new DatabaseContext();
    }
  }
}