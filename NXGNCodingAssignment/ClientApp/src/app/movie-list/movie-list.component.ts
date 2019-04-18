import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html'
})
export class MovieListComponent implements OnInit {

  Movie: any = [];
  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    this.loadMovies()
  }

  // Get movie list
  loadMovies() {
    return this.restApi.GetMovies().subscribe((data: {}) => {
      this.Movie = data;
      
    })
  }

  // Delete movie
  deleteMovie(id) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.restApi.DeleteMovie(id).subscribe(data => {
        this.loadMovies()
      })
    }
  }
}
