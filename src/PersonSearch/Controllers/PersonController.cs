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
        public IActionResult Search(string q)
        {
            //force the query to be an empty string if it's null
            q = q ?? "";

            var persons = _personService.SearchForPerson(q);
            return Ok(persons);
        }

        [HttpPost]
        public IActionResult AddPerson(PersonModel person)
        {
            if (person != null)
            {
                var rst = _personService.AddPerson(person);
                if (rst)
                    return Ok();
            }
            
            return BadRequest();
        }
    }
}
