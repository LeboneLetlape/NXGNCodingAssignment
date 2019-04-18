import { Injectable } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../shared/movie';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  // Define API
  apiURL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiURL = baseUrl;
  }


  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // HttpClient API get() method => Fetch Movie list
  GetMovies(): Observable<Movie> {
    return this.http.get<Movie>(this.apiURL + 'api/MovieData/GetMovies/')
      .pipe(retry(1), catchError(this.handleError))
  }

  // HttpClient API get() method => Fetch Movie
  GetMovieById(id): Observable<Movie> {
    return this.http.get<Movie>(this.apiURL + 'api/MovieData/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API post() method => Create Movie
  AddMovie(Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiURL + 'api/MovieData/AddMovie/', JSON.stringify(Movie), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API put() method => Update Movie
  EditMovie(id, Movie): Observable<Movie> {
    return this.http.put<Movie>(this.apiURL + 'api/MovieData/' + id, JSON.stringify(Movie), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API delete() method => Delete Movie
  DeleteMovie(id) {
    return this.http.delete<Movie>(this.apiURL + 'api/MovieData/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
