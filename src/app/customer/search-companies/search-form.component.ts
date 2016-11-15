import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
// import { CustomerService } from '../customer.service'

@Component({
  selector: 'app-search-form',
  template: `
    <form [formGroup]="searchForm" novalidate (ngSubmit)="onSubmit(searchForm.value)">
      <input type="text" formControlName="search" placeholder="What do you want to do?">
      <button type="submit">Search</button>
      <br>
      <span *ngIf="!searchForm.controls.search.valid && submitted">Please enter some value</span>
    </form>
  `,
  styles: []
})
export class SearchFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private el: ElementRef) { }
  public submitted: boolean
  public searchForm: FormGroup
  public filteredList = []
  public list = ['a', 'b', 'c']

  ngOnInit() {
    this.submitted = false
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]]
    })
  }

}
