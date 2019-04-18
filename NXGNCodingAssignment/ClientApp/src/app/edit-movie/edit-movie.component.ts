import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html'
})

export class MovieEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  movieData: any = {};

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.restApi.GetMovieById(this.id).subscribe((data: {}) => {
      this.movieData = data;
    })
  }

  // Update employee data
  updateMovie() {
    if (window.confirm('Are you sure, you want to update?')) {
      this.restApi.EditMovie(this.id, this.movieData).subscribe(data => {
        this.router.navigate([''])
      })
    }
  }
}
