using Chat.Entities.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chat.Entities.Identity
{
  [Table("Profiles")]
  public class Profile : IEntity
  {
    #region Properties

    [NotMapped]
    public string Id { get; set; }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public string UserId { get; set; }

    [Required, StringLength(32, MinimumLength = 2)]
    public string FirstName { get; set; }

    [Required, StringLength(32, MinimumLength = 2)]
    public string LastName { get; set; }

    //TODO Сделать инициализацию
    public DateTime DateOfBirth { get; set; }

    #endregion

    #region Navigation Properties

    [InverseProperty("Profile")]
    public virtual User User { get; set; }

    #endregion
  }
}