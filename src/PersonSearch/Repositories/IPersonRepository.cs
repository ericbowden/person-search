using System.Linq;
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
