import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { WfmEvent } from '../../shared/models/event.model';
import { EventsService } from '../../shared/services/events.service';

@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  isLoaded = false;
  s1!: Subscription;
  s2!: Subscription;
  event!: WfmEvent;

  constructor(private route: ActivatedRoute, private eventsService: EventsService) { }

  ngOnInit(): void {
    this.s1 = this.route.params
      .subscribe((params: Params) => {
        this.s2 = this.eventsService.getEventById(params['id'])
          .subscribe((event: WfmEvent) => {
            this.event = event;
            this.isLoaded = true;
          });
      })
  }

  getEventStyle(){
    
  }

  ngOnDestroy(): void {
    
    if(this.s1) this.s1.unsubscribe;
    if(this.s2) this.s2.unsubscribe;
  }

}
