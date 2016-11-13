import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-signin',
  template: `
    <p>
      signin Works!
    </p>
    <form [formGroup]="signinForm" (ngSubmit)="onSubmit()" novalidate>

      <label for="email">Email</label>
      <br>
      <input type="email" formControlName="email">
      <br>
      <span *ngIf="signinForm.controls.email.hasError('required') && submitted">Email is required.</span>
      <br>

      <label for="password">Password</label>
      <br>
      <input type="password" formControlName="password">
      <br>
      <span *ngIf="signinForm.controls.password.hasError('required') && !submitted">Password is required (minimum 5 characters).</span>
      <br>
      <button type="submit">Signup</button>

    </form>
  `,
  styles: []
})
export class SigninComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  public submitted: Boolean = false;
  public signinForm: FormGroup

  ngOnInit() {
    this.submitted = false
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onNewUserSubmit(){
    console.log('asdfasdf')
    this.submitted = true
  }


}
