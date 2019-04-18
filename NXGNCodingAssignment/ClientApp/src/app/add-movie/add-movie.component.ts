import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html'
})
export class AddMovieComponent implements OnInit {

  @Input() movieDetails = { name: '', category: '', rate: 0 }

  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit() { }

  addMovie(dataMovie) {
    this.restApi.AddMovie(this.movieDetails).subscribe((data: {}) => {
      this.router.navigate([''])
    })
  }

}
