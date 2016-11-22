import { Component, OnInit } from '@angular/core';
// import { SignupComponent } from './auth/signup.component';
// import { SigninComponent } from './auth/signin.component';
// import { AuthService } from './auth/auth.service'
// import { Subscription } from 'rxjs/Rx'
@Component({
  selector: 'app-home',
  template: `
    <div class="container-fluid">
      <div class="row" style="height:70%">
        <div class="col-xs-12">
        </div>
      </div>
      <div class="row" style="height:30%">
        <div class="col-xs-12">
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container-fluid {
        height: 100vh;
      }
    `
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
