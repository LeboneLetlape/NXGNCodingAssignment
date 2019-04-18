using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NXGNCodingAssignment.Data;

namespace NXGNCodingAssignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieDataController : ControllerBase
    {
        private readonly IMovieProvider movieProvider;

        List<Movie> Movies = new List<Movie>();
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        public MovieDataController(IMovieProvider movieProvider)
        {
            this.movieProvider = movieProvider;
        }

        [HttpGet("[action]")]
        public List<Movie> GetMovies()
        {
            return movieProvider.GetMovies().ToList();
        }

        // PUT api/user/5  
        [HttpGet("{id}")]
        public Movie GetMovie(int id)
        {
            return movieProvider.GetMovie(id);
        }


        // PUT api/user/5  
        [HttpPost("AddMovie")]
        public void AddMovie([FromBody] Movie movie)
        {
            movieProvider.AddMovie(movie);
        }


        [HttpPut("{id}")]
        public void UpdateMovie(int id,[FromBody] Movie movie)
        {

            movieProvider.UpdateMovie(movie);
        }


        [HttpDelete("{id}")]
        public void DeleteMovie(int id)
        {
            movieProvider.DeleteMovie(id);
        }
    }


    public class Movie
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public int Rate { get; set; }
    }
}