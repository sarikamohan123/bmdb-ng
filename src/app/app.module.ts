import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './feature/movie/movie-list/movie-list.component';
import { FormsModule } from '@angular/forms';
import { MovieCreateComponent } from './feature/movie/movie-create/movie-create.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { MenuComponent } from './core/menu/menu.component';
import { ActorListComponent } from './feature/Actor/actor-list/actor-list.component';
import { provideHttpClient } from '@angular/common/http';
import { ActorCreateComponent } from './feature/Actor/actor-create/actor-create.component';
import { CreditListComponent } from './feature/credit/credit-list/credit-list.component';
import { CreditCreateComponent } from './feature/credit/credit-create/credit-create.component';
import { MovieEditComponent } from './feature/movie/movie-edit/movie-edit.component';
import { ActorDetailComponent } from './feature/Actor/actor-detail/actor-detail.component';
import { ActorEditComponent } from './feature/Actor/actor-edit/actor-edit.component';
import { MovieDetailComponent } from './feature/movie/movie-detail/movie-detail.component';
import { CreditDetailComponent } from './feature/credit/credit-detail/credit-detail.component';
import { CreditEditComponent } from './feature/credit/credit-edit/credit-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieCreateComponent,
    NotFoundComponent,
    MenuComponent,
    ActorListComponent,
    ActorCreateComponent,
    CreditListComponent,
    CreditCreateComponent,
    MovieEditComponent,
    ActorDetailComponent,
    ActorEditComponent,
    MovieDetailComponent,
    CreditDetailComponent,
    CreditEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
