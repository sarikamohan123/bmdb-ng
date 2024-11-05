import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.css'
})
export class MovieEditComponent implements OnInit, OnDestroy {

  title: string = "Movie Edit";
  movieId!: number;
  movie!: Movie;
  subscription!: Subscription;
  ratingOptions: string[] = ['G', 'PG', 'R', 'PG-13', 'NC-17'];

  constructor(private movieSrvc: MovieService,
    private router: Router,
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // get id from the url and fetch movie data

    this.actRoute.params.subscribe((params) => {
      this.movieId = params['id'];
      // get the movie for the id
      this.subscription = this.movieSrvc.getById(this.movieId).subscribe({
        next: (resp) => {
          this.movie = resp;
        },
        error: (err) => {
          console.log('Error retrieving movie: ', err);
        },
      });
    })

  }

  updateMovie(): void {
    this.movieSrvc.update(this.movie).subscribe({
      next: (resp) => {
        console.log("Movie updated:", resp);
        // redirect to movie list page
        this.router.navigateByUrl('/movie-list');
      },
      error: (err) => {
        console.error('Error in updating movie:', err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }




}

