import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '../../../model/actor';
import { Subscription } from 'rxjs';
import { ActorService } from '../../../service/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrl: './actor-list.component.css'
})
export class ActorListComponent implements OnInit, OnDestroy {

  title: string = 'Actor List';
  actors: Actor[] | undefined;
  subscription!: Subscription;
  constructor(private actorSvc: ActorService) { }


  /*deleteActor(id: number): void {
    this.actors = this.actors.filter(actor => actor.id !== id)
  }*/
  /*ngOnInit(): void {
    this.subscription = this.actorSvc.list().subscribe(
      (resp) => {
        this.actors = resp;
      });
  }*/
  ngOnInit(): void {
    this.subscription = this.actorSvc.list().subscribe(
      (resp) => {
        console.log('Actors fetched:', resp);  // Log fetched actors to check if data is coming in
        this.actors = resp;
      },
      (error) => {
        console.error("Error fetching actors:", error);  // Log any errors
      }
    );
  }

  delete(id: number): void {
    this.subscription = this.actorSvc.delete(id).subscribe({
      next: () => {
        // refreshing the list.
        this.subscription = this.actorSvc.list().subscribe((resp) => {
          this.actors = resp;
        });
      },
      error: (err) => {
        console.error('Error deleting actorfor id:' + id);
        alert('Error deleting  actor for id:' + id);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
