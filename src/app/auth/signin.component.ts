import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-signin',
  template: `
    <p>
      signin Works!
    </p>
    <form [formGroup]="signinForm" (ngSubmit)="onSubmit()" novalidate>
      <label>Email</label>
      <input type="email" formControlName="email">
      <span [hidden]="signinForm.controls.email.pristine && !submitted">Email is required.</span>
      <br>
      <label>Password</label>
      <input type="password" formControlName="password">
      <span [hidden]="signinForm.controls.password.pristine && !submitted">Password is required (minimum 5 characters).</span>
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
