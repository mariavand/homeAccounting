import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'wfm-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent{

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  selectedPeriod = 'd';
  selectedTypes: any[] = [];
  selectedCategories: any[] = [];

  timePeriods = [
    { type: 'd', label: 'Day' },
    { type: 'w', label: 'Week' },
    { type: 'M', label: 'Month' }
  ];

  types = [
    { type: 'income', label: 'Income' },
    { type: 'outcome', label: 'Outcome' }
  ];

  private calculateInputParams(field: string, checked: boolean, value: string){
    const arraysMap = {
      selectedTypes: 'selectedTypes',
      selectedCategories: 'selectedCategories'
    };

    if(checked){
      this[field as keyof typeof arraysMap].indexOf(value) === -1 ? this[field as keyof typeof arraysMap].push(value) : null;
    }
    else{
      this[field as keyof typeof arraysMap] = this[field as keyof typeof arraysMap].filter(i => i !== value);
    }
  }

  handleChangedType(target: any){
    this.calculateInputParams('selectedTypes', target.checked, target.value);
  }

  handleChangedCategory(target: any){
    this.calculateInputParams('selectedCategories', target.checked, target.value);
  }

  applyFilter(){
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

  closeFilter(){
    this.selectedCategories = [];
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.onFilterCancel.emit();
  }

}
