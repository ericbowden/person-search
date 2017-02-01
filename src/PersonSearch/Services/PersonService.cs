﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PersonSearch.Models;
using PersonSearch.Repositories;

namespace PersonSearch.Services
{
    public class PersonService : IPersonService
    {

        private readonly IPersonRepository _personRepository;

        public PersonService(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        public List<PersonModel> SearchForPerson(string name)
        {
            var persons = _personRepository.List();

            return persons.Select(p => new PersonModel
            {
                FirstName = p.FirstName,
                LastName = p.LastName
            }).ToList();
        }
    }
}