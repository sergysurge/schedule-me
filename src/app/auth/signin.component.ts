import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  template: `
    <p>
      signin Works!
    </p>
    <form [formGroup]="signinForm" (ngSubmit)="onSubmit(signinForm.value)" novalidate>

      <label for="email">Email</label>
      <br>
      <input type="email" formControlName="email">
      <br>
      <span *ngIf="!signinForm.controls.email.valid && submitted">Email is required.</span>
      <br>

      <label for="password">Password</label>
      <br>
      <input type="password" formControlName="password">
      <br>
      <span *ngIf="!signinForm.controls.password.valid && submitted">Password is required (minimum 5 characters).</span>
      <br>
      <button type="submit">Signup</button>
      <br>
      <span *ngIf="incorrectMsg">Wrong email or password</span>
      <span *ngIf="errorMsg">Server error, try again later</span>

    </form>
  `,
  styles: []
})
export class SigninComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  public submitted: Boolean = false
  public incorrectMsg: Boolean = false
  public errorMsg: Boolean = false
  public signinForm: FormGroup
  private subscription

  ngOnInit() {
    this.submitted = false
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(user) {
    this.submitted = true
    if (this.signinForm.valid) {
      this.subscription = this.authService.signin(user)
        .subscribe(
          (res) => {
            if (res.response.success) {
              this.router.navigate(['users'])
            } else if (res.response.message === 'incorrect password' || res.response.message === 'user not found') {
              this.incorrectMsg = true
            }
          },
          (err) => {
            this.errorMsg = true
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
