import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-signup',
  template: `
    <p>
      login Works!
    </p>
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()" novalidate>
      <label>First Name</label>
      <input type="text" formControlName="firstName">
      <br>
      <span [hidden]="signupForm.controls.firstName.pristine && !submitted">First name is required.</span>
      <br>
      <label>Last Name</label>
      <input type="text" formControlName="lastName">
      <span [hidden]="signupForm.controls.lastName.pristine && !submitted">Last name is required.</span>
      <br>
      <label>Email</label>
      <input type="email" formControlName="email">
      <span [hidden]="signupForm.controls.email.pristine && !submitted">Email is required.</span>
      <br>
      <label>Password</label>
      <input type="password" formControlName="password">
      <span [hidden]="signupForm.controls.password.pristine && !submitted">Password is required (minimum 5 characters).</span>
      <button type="submit">Signup</button>
    </form>
  `,
  styles: []
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  public submitted: Boolean = false;
  public signupForm: FormGroup

  ngOnInit() {
    this.submitted = false
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onSubmit(){
    console.log('asdfasdf')
    this.submitted = true
  }


}
