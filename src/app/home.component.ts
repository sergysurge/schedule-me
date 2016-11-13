import { Component, OnInit } from '@angular/core';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';

@Component({
  selector: 'app-home',
  template: `
    <app-tabs>
      <app-tab title="Signup">
        <app-signup></app-signup>
      </app-tab>
      <app-tab title="Signin">
        <app-signin></app-signin>
      </app-tab>
    </app-tabs>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
