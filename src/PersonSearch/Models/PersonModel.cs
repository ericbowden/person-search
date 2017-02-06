using System.ComponentModel.DataAnnotations;

namespace PersonSearch.Models
{
    public class PersonModel
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Phone { get; set; }
        public string Picture { get; set; }
        public string Address { get; set; }
    }
}
