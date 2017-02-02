using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PersonSearch.Models;
using PersonSearch.Services;

namespace PersonSearch.Controllers
{
    [Route("api/[controller]")]
    public class PersonController : Controller
    {
        private readonly IPersonService _personService;

        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet]
        [Route("search")]
        public IActionResult Search(string name)
        {
            var persons = _personService.SearchForPerson(name);
            return Ok(persons);
        }

        [HttpGet]
        [Route("add")]
        public IActionResult AddPerson()
        {
            var person = new PersonModel
            {
                FirstName = "Bob",
                LastName = "Bobberson"
            };
            var rst = _personService.AddPerson(person);
            if(rst)
                return Ok();
            else
                return BadRequest();
        }
    }
}
