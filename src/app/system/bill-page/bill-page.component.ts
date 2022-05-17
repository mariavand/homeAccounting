import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { BillService } from '../shared/services/bill.service';

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  subscription!: Subscription;

  constructor(private billService: BillService) { }

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.billService.getBill(),
      this.billService.getCurrency()]
    ).subscribe((data: [Bill, any]) => {
      console.log(data)
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe;
  }

}
