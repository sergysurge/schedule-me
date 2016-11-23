import { Component, OnInit } from '@angular/core';
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { AuthService } from './auth.service'
import { Subscription } from 'rxjs/Rx'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class AuthComponent implements OnInit {
  isUserLoggedIn: boolean
  private authSubscription: Subscription

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.getIsUserLoggedIn()
      .subscribe(
        (loggedIn) => { this.isUserLoggedIn = loggedIn },
        (err) => { console.log(err) }
      )
  }

}
