using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(450)")]
        public string IdUser { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(256)")]
        public string UserName { get; set; }

        [Column(TypeName = "nvarchar(150)")]
        public string FullName { get; set; }
    }
}
