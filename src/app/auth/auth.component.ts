import { Component, OnInit } from '@angular/core';
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { AuthService } from './auth.service'
import { Subscription } from 'rxjs/Rx'
@Component({
  selector: 'app-auth',
  template: `
    <div class="row">
      asdfasdfsadf
    </div>
    <div class="row">
      <div class="col-xs-8">
      asdf
      </div>
      <div class="col-xs-4">
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
      </div>
    </div>
    <div class="row">
      asdfasdf
    </div>
  `,
  styles: [
    `
      #signin {
        width: 400px;
        height: 550px;
        border: 2px solid black;
        font-size: 14px;
        border-radius: 8px;
      } 
    `
  ]
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
