using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PersonSearch.Models;

namespace PersonSearch.Repositories
{
    public interface IPersonRepository
    {
        IQueryable<PersonDto> List();
        PersonDto Get(string id);
        bool Create(PersonDto person);
        bool Delete(string id);
        bool SaveChanges();
    }
}
