import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  public submitted: Boolean = false
  public signupForm: FormGroup
  public errorMsg: string
  public userExists: Boolean = false
  public passwordError: Boolean = false
  private subscription: any
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

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
    console.log(userData.password, userData.verifyPassword)
    // this.passwordsMatch = userData.password === userData.verifyPassword
    if (userData.password !== userData.verifyPassword) {
      this.passwordError = true
    }
    else if (this.signupForm.valid) {
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
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

}
