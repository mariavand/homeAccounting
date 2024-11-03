import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs-compat';
import { Category } from '../shared/models/category.model';
import { WfmEvent } from '../shared/models/event.model';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import * as moment from 'moment';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  s1!: Subscription;
  s2!: Subscription;
  categories: Category[] = [];
  events: WfmEvent[] = [];
  chartData: any = [];
  isFilterVisible = false;

  filteredEvents: WfmEvent[] = [];

  constructor(private categoriesService: CategoriesService, private eventsService: EventsService) { }

  ngOnInit(): void {
  this.s1 = this.categoriesService.getCategories()
      .subscribe((data: Category[]) => {
        this.categories = data;
      });

  this.s2 = this.eventsService.getEvents()
      .subscribe((data: WfmEvent[]) => {
        this.events = data;
        this.setOriginalEvents();
        this.calculateChartData();
      });

    if (this.s1 && this.s2) this.isLoaded = true;
  }

  private setOriginalEvents(){
    this.filteredEvents = this.events.slice();
  }

  calculateChartData(): void{
    this.chartData = [];
    
    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome')
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, event) => {
          total += event.amount;
          return total;
        }, 0)
      });
    });
    
  }

  private toggleFilterVisibility(dir: boolean){
    this.isFilterVisible = dir;
  }

  openFilter(){
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData: any){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    console.log(filterData);

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types[0].indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return parseInt(filterData.categories.indexOf(e.category)) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');        
        return momentDate.isBetween(startPeriod, endPeriod);
      })

      this.calculateChartData();
  }

  onFilterCancel(){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy(): void {
    if(this.s1 && this.s2) {
      this.s1.unsubscribe;
      this.s2.unsubscribe;
    }
  }

}
