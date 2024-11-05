import { Component, OnDestroy, OnInit } from '@angular/core';
import { Credit } from '../../../model/credit';
import { Subscription } from 'rxjs';
import { CreditService } from '../../../service/credit.service';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrl: './credit-list.component.css'
})
export class CreditListComponent implements OnInit, OnDestroy {
  title: string = 'Credit List';
  credits: Credit[] | undefined;

  subscription!: Subscription;

  constructor(private creditSvc: CreditService) { }
  ngOnInit(): void {
    this.subscription = this.creditSvc.list().subscribe(
      (resp) => {
        this.credits = resp;
      });

  }


  delete(id: number): void {
    this.subscription = this.creditSvc.delete(id).subscribe({
      next: () => {
        // refreshing the list.
        this.subscription = this.creditSvc.list().subscribe((resp) => {
          this.credits = resp;
        });
      },
      error: (err) => {
        console.error('Error deleting credit for id:' + id);
        alert('Error deleting  credit for id:' + id);
      },
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
