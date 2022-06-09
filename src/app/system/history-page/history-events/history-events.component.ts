import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { WfmEvent } from '../../shared/models/event.model';

@Component({
  selector: 'wfm-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: WfmEvent[] = [];


  constructor() { }

  ngOnInit(): void {
    
  }

  getEventClass(e: WfmEvent){
    return {
      'badge ': true,
      'bg-danger': e.type === 'outcome',
      'bg-success': e.type === 'income'
    };
  }

}
