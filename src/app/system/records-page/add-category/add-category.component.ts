import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy{

  sub1!: Subscription;

  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  onSubmit(form: NgForm){
    let { name, capacity } = form.value;    

    const category = new Category(name, capacity);

    this.sub1 = this.categoriesService.addCategory(category)
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.onCategoryAdd.emit(category);
      });

  }
  ngOnDestroy(): void {
    if(this.sub1) this.sub1.unsubscribe;    
  }
}
