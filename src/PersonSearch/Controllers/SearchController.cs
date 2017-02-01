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
    public class SearchController : Controller
    {
        private readonly IPersonService _personService;

        public SearchController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet]
        public IActionResult Search(string name)
        {
            var persons = _personService.SearchForPerson(name);
            return Ok(persons);
        }

    }
}
