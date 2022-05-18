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

  sub1!: Subscription;
  sub2!: Subscription;

  currency!: any;
  bill!: Bill;

  isLoaded = false;

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.sub1 = combineLatest([
      this.billService.getBill(),
      this.billService.getCurrency()]
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  onRefresh(){
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
    })
  }

  ngOnDestroy(){
    this.sub1.unsubscribe;
    this.sub2.unsubscribe;
  }

}
