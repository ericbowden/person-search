using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PersonSearch.Models;

namespace PersonSearch.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        public IQueryable<PersonDto> List()
        {
            throw new NotImplementedException();
        }

        public PersonDto Get(int id)
        {
            throw new NotImplementedException();
        }

        public bool Create(PersonDto item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public bool SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}
