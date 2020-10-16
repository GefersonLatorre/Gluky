using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(450)")]
        public string IdUserPublishes { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int IdPublication { get; set; }

        [Column(TypeName = "varchar(max)")]
        public string Commentary { get; set; }
        
        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Date { get; set; }

    }
}
