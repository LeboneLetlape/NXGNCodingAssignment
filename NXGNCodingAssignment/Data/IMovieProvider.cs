using NXGNCodingAssignment.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NXGNCodingAssignment.Data
{
    public interface IMovieProvider
    {
        IEnumerable<Movie> GetMovies();
        int UpdateMovie(Movie movie);
        int DeleteMovie(int id);
        Movie GetMovie(int id);
        int AddMovie(Movie movie);
    }
}
