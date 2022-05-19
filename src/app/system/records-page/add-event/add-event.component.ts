import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { WfmEvent } from '../../shared/models/event.model';
import * as moment from 'moment';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];

  types = [
    {type: 'income', label: 'Income'},
    {type: 'outcome', label: 'Outcome'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    let {amount, category, description, type} = form.value;

    const event = new WfmEvent(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);
  }

  
}
