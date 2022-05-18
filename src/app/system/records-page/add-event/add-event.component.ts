import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  form!: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){

  }
  
}
