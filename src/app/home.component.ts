import { Component, OnInit } from '@angular/core';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { AuthService } from './auth/auth.service'
import { Subscription } from 'rxjs/Rx'
@Component({
  selector: 'app-home',
  template: `
    <div id="signin" *ngIf="!isUserLoggedIn">
      <app-tabs tabsStyle="nav nav-tabs nav-justified">
        <app-tab title="Signup">
          <app-signup></app-signup>
        </app-tab>
        <app-tab title="Signin">
          <app-signin></app-signin>
        </app-tab>
      </app-tabs>
    </div>
  `,
  styles: [
    `
      #signin {
        width: 500px;
        height: 500px;
        border: 2px solid black;
      } 
    `
  ]
})
export class HomeComponent implements OnInit {
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
