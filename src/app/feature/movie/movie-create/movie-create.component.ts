import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie';
import { Subscription } from 'rxjs';
import { MovieService } from '../../../service/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrl: './movie-create.component.css'
})
export class MovieCreateComponent implements OnInit, OnDestroy {
  title: string = 'Movie Create';
  newMovie: Movie = new Movie();
  subscription!: Subscription;
  ratings: string[] = ['G,', 'PG', 'R', 'PG-13', 'NC-17']

  constructor(private movieSvc: MovieService, private router: Router) { }
  ngOnInit(): void {

  }


  addMovie() {

    this.subscription = this.movieSvc.add(this.newMovie).subscribe((resp) => {
      // redirect to movie-list component
      this.router.navigateByUrl("/movie-list");
    });

  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  // call movieSvc.add method
  //forward to movie-list
}
