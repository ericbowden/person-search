using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PersonSearch.Models;

namespace PersonSearch.Services
{
    public class PersonService : IPersonService
    {
        public List<PersonModel> SearchForPerson(string name)
        {
            return new List<PersonModel>
            {
                new PersonModel
                {
                    FirstName = "Becky",
                    LastName = "Sims"
                }
            };
        }
    }
}
