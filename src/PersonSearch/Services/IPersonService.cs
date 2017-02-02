using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PersonSearch.Models;

namespace PersonSearch.Services
{
    public interface IPersonService 
    {
        List<PersonModel> SearchForPerson(string name);
        bool AddPerson(PersonModel person);
    }
}
