import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',
  template: `
    <p>
      login Works!
    </p>
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit(signupForm.value)" novalidate>

      <label for="firstName">First Name</label>
      <br>
      <input type="text" formControlName="firstName">
      <br>
      <span *ngIf="signupForm.controls.firstName.hasError('required') && submitted">First name is required.</span>
      <br>

      <label for="lastName">Last Name</label>
      <br>
      <input type="text" formControlName="lastName">
      <br>
      <span *ngIf="signupForm.controls.lastName.hasError('required') && submitted">Last name is required.</span>
      <br>

      <label for="email">Email</label>
      <br>
      <input type="email" formControlName="email">
      <br>
      <span *ngIf="signupForm.controls.email.pristine && submitted">Email is required.</span>
      <br>

      <label for="password">Password</label>
      <br>
      <input type="password" formControlName="password">
      <br>
      <span *ngIf="signupForm.controls.password.hasError('required') && submitted">Password is required</span>
      <span *ngIf="signupForm.controls.password.hasError('minLength') && !submitted">Password must be at least 6 characters</span>
      <br>
      <label for="verifyPassword">Verify Password</label>
      <br>
      <input type="password" formControlName="verifyPassword">
      <br>
      <span *ngIf="signupForm.controls.verifyPassword.pristine && submitted">Please verify your password.</span>
      <br>
      <button type="submit">Signup</button>
      <br>
      <span *ngIf="userExists">{{errorMsg}}</span>
    </form>
  `,
  styles: []
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  public submitted: Boolean = false
  public passwordsMatch: Boolean = true
  public signupForm: FormGroup
  public errorMsg: string
  public userExists: Boolean = false

  ngOnInit() {

    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      verifyPassword: ['', [Validators.required]]
    })
  }

  onSubmit(userData: any){
    this.submitted = true
    this.passwordsMatch = userData.password === userData.verifyPassword
    console.log(this.passwordsMatch)
    if (this.passwordsMatch) {
      let user = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password
      }
      
      this.authService.submitUserData(user)
        .subscribe(
          (res) => {
            if (res.response.success) {
              this.router.navigate(['users'])
            } else if (res.response.message === 'user already exists') {
              this.errorMsg = 'Account already exists under this email, please signin'
              this.userExists = true
            }
          },
          (err) => {console.error(err)},
          () => {console.log('done')}
        )

    } 

  }

}
