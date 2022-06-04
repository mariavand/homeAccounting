import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/shared/models/message.model';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'wfm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy{

  sub1!: Subscription;

  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory?: Category;
  message!: Message;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm){    
    let { ename, capacity } = form.value;   

    const category = new Category(ename, capacity, this.currentCategoryId);
    
    this.sub1 = this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'The category was updated successfully.';
        window.setTimeout(() => this.message.text = '', 5000);
      });

  }

  onCategoryChange(){
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);
  }
  ngOnDestroy(): void {
    if(this.sub1) this.sub1.unsubscribe;
  }
}
