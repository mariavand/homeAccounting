import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'wfm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill!: Bill;
  @Input() currency: any;

  dollar!: number;

  constructor() { }

  ngOnInit(): void {
    const { rates } = this.currency;
    this.dollar = rates.USD.rate * this.bill.value;
  }

}
