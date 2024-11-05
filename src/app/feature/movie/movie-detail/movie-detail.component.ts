import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../../../model/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../service/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  title: string = "Movie Detail";
  movieId!: number;
  movie!: Movie;
  subscription!: Subscription;

  constructor(
    private movieSrvc: MovieService,
    private actRoute: ActivatedRoute,
    private router: Router


  ) { }

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

  getMovieDetails(id: number): void {
    this.movieSrvc.getById(id).subscribe({
      next: (resp) => {
        this.movie = resp;
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
      }
    });
  }
  updateMovie(): void {
    this.movieSrvc.update(this.movie).subscribe({
      next: (resp) => {
        console.log("Movie updated:", resp);
        // redirect to movie list page
        this.router.navigate(['/movie-edit', this.movieId]);
      },
      error: (err) => {
        console.error('Error in updating movie:', err);
      },
    });
  }

  deleteMovie(): void {
    if (confirm("Are you sure you want to delete this movie?")) {
      this.movieSrvc.delete(this.movieId).subscribe({
        next: () => {
          alert("Movie deleted successfully.");
          this.router.navigate(['/movie-list']); // Navigate back to the movie list after deletion
        },
        error: (err) => {
          console.error("Error deleting movie:", err);
          alert("Failed to delete the movie. Please try again.");
        }
      });
    }
  }



  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
