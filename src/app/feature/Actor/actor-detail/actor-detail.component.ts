import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actor } from '../../../model/actor';
import { ActorService } from '../../../service/actor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrl: './actor-detail.component.css'
})
export class ActorDetailComponent implements OnInit, OnDestroy {
  title: string = "Actor Detail";
  actorId!: number;
  actor!: Actor;
  subscription!: Subscription;

  constructor(
    private actorSrvc: ActorService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    //get id from the url and fetch actor data
    this.actRoute.params.subscribe((params) => {
      this.actorId = params['id'];
      // get the actor for the id
      this.subscription = this.actorSrvc.getById(this.actorId).subscribe({
        next: (resp) => {
          this.actor = resp;
        },
        error: (err) => {
          console.log('Error retrieving movie: ', err);
        },
      });
    })

  }


  getActorDetails(id: number): void {
    this.actorSrvc.getById(id).subscribe({
      next: (resp) => {
        this.actor = resp;
      },
      error: (err) => {
        console.error('Error fetching actor details:', err);
      }
    });
  }



  updateActor(): void {
    this.actorSrvc.update(this.actor).subscribe({
      next: (resp) => {
        console.log("Actor updated:", resp);
        // redirect to movie list page
        this.router.navigate(['/actor-edit', this.actorId]);
      },
      error: (err) => {
        console.error('Error in updating movie:', err);
      },
    });
  }

  deleteActor(): void {
    if (confirm("Are you sure you want to delete this actor?")) {
      this.actorSrvc.delete(this.actorId).subscribe({
        next: () => {
          alert("Actor deleted successfully.");
          this.router.navigate(['/actor-list']); // Navigate back to the movie list after deletion
        },
        error: (err) => {
          console.error("Error deleting actor:", err);
          alert("Failed to delete the actor. Please try again.");
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
