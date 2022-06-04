import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { WfmEvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import 'rxjs/add/operator/mergeMap';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  sub1!: Subscription;
  sub2!: Subscription;
  @Input() categories: Category[] = [];

  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Outcome'}
  ];

  message!: Message;

  constructor(private eventsService: EventsService, private billService: BillService) { }

  ngOnInit(): void {
    this.message = new Message('warning', '');
  }

  private showMessage(text: string){
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    let {amount, category, description, type} = form.value;

    const event = new WfmEvent(
      type, amount, +category, 
      moment().format('DD.MM.YYYY HH:mm:ss'), description
    );

    this.sub1 = this.billService.getBill()
        .subscribe((bill: Bill) => {
          let value = 0;
          if(type === 'outcome'){
            if(amount > bill.value){
              this.showMessage(`There are not enough funds on the account. You need ${amount - bill.value} more.`);
            }
            else{
              value = bill.value - amount;
            }
          }
          else{
            value = bill.value + amount;
          }

          this.sub2 = this.billService.updateBill({value, currency: bill.currency})
            .mergeMap(() => this.eventsService.addEvent(event))
            .subscribe(() =>{
              form.setValue({
                amount: 0,
                description: '',
                category: 1,
                type: 'outcome'
              });
            });

        });
  }

  ngOnDestroy(): void {
    if(this.sub1) this.sub1.unsubscribe;
    if (this.sub2) this.sub2.unsubscribe;
  }
  
}
