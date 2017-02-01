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
        PersonDto Get(int id);
        bool Create(PersonDto item);
        bool Delete(int id);
        bool SaveChanges();
    }
}
