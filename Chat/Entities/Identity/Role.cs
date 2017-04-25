using Chat.Entities.Interfaces;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chat.Entities.Identity
{
  [Table("Roles")]
  public class Role : ApplicationRole, IEntity
  {
  }
}