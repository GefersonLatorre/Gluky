using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Publication
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(450)")]
        public string IdUser { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(450)")]
        public string IdUserPublishes { get; set; }

        [Column(TypeName = "varchar(max)")]
        public string Image { get; set; }

        [Column(TypeName = "varchar(max)")]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Date { get; set; }

        [Required]
        [Column(TypeName = "int")]
        public int Private { get; set; }
    }
}
