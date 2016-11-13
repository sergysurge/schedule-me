import { Component, OnInit, OnDestroy } from '@angular/core';
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
      <span *ngIf="!signupForm.controls.firstName.valid && submitted">First name is required.</span>
      <br>

      <label for="lastName">Last Name</label>
      <br>
      <input type="text" formControlName="lastName">
      <br>
      <span *ngIf="!signupForm.controls.lastName.valid && submitted">Last name is required.</span>
      <br>

      <label for="email">Email</label>
      <br>
      <input type="email" formControlName="email">
      <br>
      <span *ngIf="!signupForm.controls.email.valid && submitted">Email is required.</span>
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
      <span *ngIf="signupForm.controls.verifyPassword.hasError('required') && submitted">Please verify your password.</span>
      <br>
      <button type="submit">Signup</button>
      <br>
      <span *ngIf="userExists">Account already exists under this email, please sign in</span>
    </form>
  `,
  styles: []
})
export class SignupComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  public submitted: Boolean = false
  public passwordsMatch: Boolean = true
  public signupForm: FormGroup
  public errorMsg: string
  public userExists: Boolean = false
  private subscription

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

    if (this.passwordsMatch) {
      let user = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password
      }
      
      this.subscription = this.authService.submitUserData(user)
        .subscribe(
          (res) => {
            if (res.response.success) {
              this.router.navigate(['users'])
            } else if (res.response.message === 'user already exists') {
              this.errorMsg = 'Account already exists under this email, please signin'
              this.userExists = true
            }
          },
          (err) => {
            this.errorMsg = "Server error, try again later"
            console.error(err)
          },
          () => {
            console.log('done')
          }
        )
    } 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
