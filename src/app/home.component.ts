import { Component, OnInit } from '@angular/core';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
@Component({
  selector: 'app-home',
  template: `
    <p>
      home Works!
    </p>
    <app-signup></app-signup>
    <app-signin></app-signin>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
