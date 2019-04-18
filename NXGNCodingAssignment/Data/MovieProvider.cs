using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using NXGNCodingAssignment.Controllers;

namespace NXGNCodingAssignment.Data
{
    public class MovieProvider : IMovieProvider
    {
        private readonly string connectionString;

        public MovieProvider(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public int AddMovie(Movie movie)
        {
            int rt = 0;
            using (var connection = new SqlConnection(connectionString))
            {
                rt = connection.Execute("INSERT INTO Movies (Name,Category,Rate) VALUES ('" + movie.Name + "','" +movie.Category+"',"+movie.Rate+")");
            }
            return rt;
        }

        public int DeleteMovie(int id)
        {
            int rt = 0;
            using (var connection = new SqlConnection(connectionString))
            {
                rt = connection.Execute("DELETE FROM Movies WHERE ID = "+id);
            }
            return rt;
        }

        public Movie GetMovie(int id)
        {
            Movie movie = new Movie();
            using (var connection = new SqlConnection(connectionString))
            {
                movie = connection.QuerySingle<Movie>("SELECT ID,Name,Category,Rate FROM Movies WHERE ID = " + id);
            }
            return movie;
        }

        public IEnumerable<Movie> GetMovies()
        {
            IEnumerable<Movie> movies;
            using (var connection = new SqlConnection(connectionString))
            {
                movies = connection.Query<Movie>("SELECT ID,Name,Category,Rate FROM Movies");
            }
            return movies;
        }

        public int UpdateMovie(Movie movie)
        {
            int rt = 0;
            using (var connection = new SqlConnection(connectionString))
            {
                var Query = String.Format("UPDATE Movies set Name = '{1}', Category = '{2}', Rate = '{3}'  WHERE ID = {0}", movie.ID, movie.Name, movie.Category, movie.Rate);
                rt = connection.Execute(Query);
            }
            return rt;
        }
    }
}
