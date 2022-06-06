import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/index';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { WfmEvent } from '../shared/models/event.model';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';

@Component({
  selector: 'wfm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  s1!: Subscription;
  s2!: Subscription;
  s3!: Subscription;
  bill!: Bill;
  categories: Category[] = [];
  events: WfmEvent[] = []; 

  constructor(private billService: BillService, 
              private categoriesService: CategoriesService, 
              private eventsService: EventsService) { }

  ngOnInit(): void {
    this.s1 = this.billService.getBill()
      .subscribe((data: Bill) => {
        this.bill = data;
      });

    this.s2 = this.categoriesService.getCategories()
      .subscribe((data: Category[]) => {
        this.categories = data;
      });

    this.s3 = this.eventsService.getEvents()
      .subscribe((data: WfmEvent[]) => {
        this.events = data;      
    });

    if (this.s1 && this.s2 && this.s3) this.isLoaded = true;
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }
  
  private getPercent(cat: Category): number{
    const percent = (100 * this.getCategoryCost(cat)/cat.capacity);
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category):string{
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category):string{
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';   
  }

  ngOnDestroy(): void {
    if(this.s1) this.s1.unsubscribe;
  }

}
