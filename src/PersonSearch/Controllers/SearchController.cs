﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PersonSearch.Controllers
{
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        [HttpGet]
        public IActionResult GetPerson()
        {
            return Ok();
        }

    }
}
