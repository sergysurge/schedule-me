import { Component } from '@angular/core';

@Component({
  selector: 'app-customer',
  template: `
    <nav class="navbar navbar-default">
      <ul class="nav navbar-nav navbar-left">
        <li [routerLinkActive]="['activated']"><a [routerLink]="['account']">My Account</a></li>
        <li [routerLinkActive]="['activated']"><a [routerLink]="['appointments']">My Appointments</a></li>
        <li [routerLinkActive]="['activated']"><a [routerLink]="['search']">Search Businesses</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      li:hover {
        color: #003459;
      }
      .activated {
        background-color: #008ea8;
      }
      .navbar .nav > .activated > a {
        color: white;
      }
    `
  ]
})
export class CustomerComponent {

  constructor() { }

}
