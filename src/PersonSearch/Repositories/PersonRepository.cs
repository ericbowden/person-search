using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;
using Newtonsoft.Json;
using PersonSearch.Models;
using static System.String;

namespace PersonSearch.Repositories
{
    public class PersonRepository : IPersonRepository
    {

        private string _url = "https://randomuser.me/api";
        private string _urlParameters = "?seed=personsearch&results=100";

        private List<PersonDto> _repo;

        public PersonRepository()
        {
            _repo = new List<PersonDto>();

            try
            {
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(_url);

                // Add an Accept header for JSON format.
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                // List data response.
                HttpResponseMessage response = client.GetAsync(_urlParameters).Result; // Blocking call!
                if (response.IsSuccessStatusCode)
                {
                    // Parse the response body. Blocking!
                    var content = response.Content.ReadAsStringAsync().Result;
                    //var content = response.Content.ReadAsStringAsync().Result;
                    var result = JsonConvert.DeserializeObject<Result>(content);

                    //var result = contentDictionary["results"];

                    foreach (var person in result.Persons)
                    {
                        _repo.Add(new PersonDto
                        {
                            Id = Guid.NewGuid().ToString(),
                            FirstName = person.NameInfo["first"],
                            LastName = person.NameInfo["last"],
                            UserName = person.LoginInfo["username"],
                            Phone = person.PhoneNumber,
                            Picture = person.PictureInfo["large"],
                            Address = GetAddress(person.LocationInfo)
                        });
                    }
                }
            }
            catch (Exception e)
            {
                throw new HttpRequestException("Error contacting http://radomuser.me: " + e.Message);
            }
        }

        private string GetAddress(Dictionary<string, string> locationInfo)
        {
            return Format("{0}, {1}, {2}, {3}", locationInfo["street"], locationInfo["city"], locationInfo["state"],locationInfo["postcode"]);
        }

        public IQueryable<PersonDto> List()
        {
            return _repo.AsQueryable();
        }

        public PersonDto Get(string id)
        {
            try
            {
                return _repo.First(p => p.Id == id);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public bool Create(PersonDto person)
        {
            try
            {
                person.Id = Guid.NewGuid().ToString();
                _repo.Add(person);
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool Delete(string id)
        {
            try
            {
                var person = _repo.Single(p => p.Id == id);
                return _repo.Remove(person);
            }
            catch (Exception e)
            {
                return false;
            }          
        }

        public bool SaveChanges()
        {
            return true;
        }

        private class Result
        {
            [JsonProperty(PropertyName = "results")]
            public List<Person> Persons { get; set; }
        }

        private class Person
        {
            [JsonProperty(PropertyName = "id")]
            public Dictionary<string, string> IdInfo { get; set; }

            [JsonProperty(PropertyName = "name")]
            public Dictionary<string, string> NameInfo { get; set; }

            [JsonProperty(PropertyName = "picture")]
            public Dictionary<string, string> PictureInfo { get; set; }

            [JsonProperty(PropertyName = "location")]
            public Dictionary<string, string> LocationInfo { get; set; }

            [JsonProperty(PropertyName = "login")]
            public Dictionary<string, string> LoginInfo { get; set; }

            [JsonProperty(PropertyName = "phone")]
            public string PhoneNumber { get; set; }
        }
    }
}
