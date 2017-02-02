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

        public List<PersonModel> SearchForPerson(string searchString = "", int take = 5)
        {
            var searchStringLowered = searchString.ToLower();
            var personsQueryable = _personRepository.List();

            //Since we are working with an IQueryable the SQL won't get executed until we enumerate it after the Where and Take call.
            //This means we only get the persons in memory that we want but not all of them.
            //we want to enumerate the IQueryable here to save a call for the Any() below.
            var personList = personsQueryable.Where(p => p.FirstName.ToLower().Contains(searchStringLowered) || p.LastName.ToLower().Contains(searchStringLowered))
                .Take(take).ToList();

            List<PersonModel> result = null;
            if (personList.Any())
            {
                result = personList.Select(p => new PersonModel
                {
                    Id = p.Id,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    UserName = p.UserName,
                    Phone = p.Phone,
                    Picture = p.Picture,
                    Address = p.Address
                }).ToList();
            }

            return result;
        }

        public bool AddPerson(PersonModel person)
        {
            return _personRepository.Create(new PersonDto
            {
                FirstName = person.FirstName,
                LastName = person.LastName,
                Address = person.Address,
                Phone = person.Phone,
                Picture = person.Picture,
                UserName = person.UserName
            });
        }
    }
}
