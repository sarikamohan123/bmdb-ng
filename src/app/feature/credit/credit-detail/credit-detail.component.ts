import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Credit } from '../../../model/credit';
import { CreditService } from '../../../service/credit.service';

@Component({
  selector: 'app-credit-detail',
  templateUrl: './credit-detail.component.html',
  styleUrl: './credit-detail.component.css'
})
export class CreditDetailComponent implements OnInit, OnDestroy {
  title: string = "Credit Detail";
  creditId!: number;
  credit!: Credit;
  subscription!: Subscription;

  constructor(
    private creditSrvc: CreditService,
    private actRoute: ActivatedRoute,
    private router: Router


  ) { }

  ngOnInit(): void {
    // get id from the url and fetch credit data

    this.actRoute.params.subscribe((params) => {
      this.creditId = params['id'];
      // get the credit for the id
      this.subscription = this.creditSrvc.getById(this.creditId).subscribe({
        next: (resp) => {
          this.credit = resp;
        },
        error: (err) => {
          console.error('Error retrieving credit: ', err);
        },
      });
    })

  }

  getCreditDetails(id: number): void {
    this.creditSrvc.getById(id).subscribe({
      next: (resp) => {
        this.credit = resp;
      },
      error: (err) => {
        console.error('Error fetching credit details:', err);
      }
    });
  }
  updateCredit(): void {
    this.creditSrvc.update(this.credit).subscribe({
      next: (resp) => {
        console.log("Credit updated:", resp);
        // redirect to credit list page
        this.router.navigate(['/credit-edit', this.creditId]);
      },
      error: (err) => {
        console.error('Error in updating credit:', err);
      },
    });
  }

  delete() {
    this.subscription = this.creditSrvc.delete(this.creditId).subscribe({
      next: (resp) => {
        this.credit = resp as Credit;
        this.router.navigateByUrl('/credit-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
