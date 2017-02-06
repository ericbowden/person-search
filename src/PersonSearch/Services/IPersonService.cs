using System.Collections.Generic;
using PersonSearch.Models;

namespace PersonSearch.Services
{
    public interface IPersonService
    {
        List<PersonModel> SearchForPerson(string searchString = "", int take = 5);
        bool AddPerson(PersonModel person);
    }
}