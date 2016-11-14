import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: []
})
export class SigninComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  public submitted: Boolean = false
  public incorrectMsg: Boolean = false
  public errorMsg: Boolean = false
  public signinForm: FormGroup
  private subscription: any

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
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }


}
