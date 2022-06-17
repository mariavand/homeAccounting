import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs-compat';
import { Category } from '../shared/models/category.model';
import { WfmEvent } from '../shared/models/event.model';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';

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

  constructor(private categoriesService: CategoriesService, private eventsService: EventsService) { }

  ngOnInit(): void {
   


  this.s1 = this.categoriesService.getCategories()
      .subscribe((data1: Category[]) => {
        this.categories = data1;
      });

  this.s2 = this.eventsService.getEvents()
      .subscribe((data2: WfmEvent[]) => {
        this.events = data2;
        this.calculateChartData();
      });

    if (this.s1 && this.s2) this.isLoaded = true;
  }

  calculateChartData(): void{
    this.chartData = [];
    
    this.categories.forEach((cat) => {
      const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome')
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

  }

  onFilterCancel(){
    this.toggleFilterVisibility(false);
  }

  ngOnDestroy(): void {
    if(this.s1 && this.s2) {
      this.s1.unsubscribe;
      this.s2.unsubscribe;
    }
  }

}
