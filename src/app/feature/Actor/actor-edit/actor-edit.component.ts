import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actor } from '../../../model/actor';
import { ActorService } from '../../../service/actor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrl: './actor-edit.component.css'
})
export class ActorEditComponent implements OnInit, OnDestroy {
  title: string = "Actor Edit";
  actorId!: number;
  actor!: Actor;
  subscription!: Subscription;

  constructor(private actorSrvc: ActorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //get id from the url and fetch actor data
    this.actRoute.params.subscribe((params) => {
      this.actorId = params['id'];
      //get the actor  for the id
      this.subscription = this.actorSrvc.getById(this.actorId).subscribe({
        next: (resp) => {
          this.actor = resp;
        },
        error: (err) => {
          console.log('Error retrieving actor', err);
        },
      });
    })

  }
  updateActor(): void {
    this.actorSrvc.update(this.actor).subscribe({
      next: (resp) => {
        console.log("Actor updated:", resp);
        //redirect to  actor list page
        this.router.navigateByUrl('/actor-list');
      },
      error: (err) => {
        console.error('error in updating actor:', err);
      },

    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
