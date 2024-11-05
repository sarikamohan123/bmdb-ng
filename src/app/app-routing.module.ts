import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './feature/movie/movie-list/movie-list.component';
import { MovieCreateComponent } from './feature/movie/movie-create/movie-create.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ActorListComponent } from './feature/Actor/actor-list/actor-list.component';
import { ActorCreateComponent } from './feature/Actor/actor-create/actor-create.component';
import { CreditListComponent } from './feature/credit/credit-list/credit-list.component';
import { CreditCreateComponent } from './feature/credit/credit-create/credit-create.component';
import { MovieEditComponent } from './feature/movie/movie-edit/movie-edit.component';
import { ActorDetailComponent } from './feature/Actor/actor-detail/actor-detail.component';
import { MovieDetailComponent } from './feature/movie/movie-detail/movie-detail.component';
import { ActorEditComponent } from './feature/Actor/actor-edit/actor-edit.component';
import { CreditDetailComponent } from './feature/credit/credit-detail/credit-detail.component';
import { CreditEditComponent } from './feature/credit/credit-edit/credit-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/movie-list', pathMatch: 'full' },
  { path: 'movie-list', component: MovieListComponent },
  { path: 'movie-create', component: MovieCreateComponent },
  { path: 'movie-edit/:id', component: MovieEditComponent },
  { path: 'movie-details/:id', component: MovieDetailComponent },
  { path: 'actor-list', component: ActorListComponent },
  { path: 'actor-create', component: ActorCreateComponent },
  { path: 'actor-edit/:id', component: ActorEditComponent },
  { path: 'actor-detail/:id', component: ActorDetailComponent },
  { path: 'credit-list', component: CreditListComponent },
  { path: 'credit-create', component: CreditCreateComponent },
  { path: 'credit-details/:id', component: CreditDetailComponent },
  { path: 'credit-edit/:id', component: CreditEditComponent },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
