import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'


@Component({
  selector: 'app-search-form',
  template: `
    <form [formGroup]="searchForm" novalidate (ngSubmit)="onSubmit(searchForm.value)">
      <input type="text" formControlName="search">
    </form>
  `,
  styles: []
})
export class SearchFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private el: ElementRef) { }
  public submitted: boolean
  public searchForm: FormGroup
  public filteredList = []


  ngOnInit() {
    this.submitted = false
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]]
    })
  }

}
