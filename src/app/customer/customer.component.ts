import { Component, OnInit } from '@angular/core';
// import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';

@Component({
  selector: 'app-customer',
  template: `
    <nav class="navbar navbar-default">
      <ul class="nav navbar-nav navbar-left">
        <li><a [routerLink]="['account']">My Account</a></li>
        <li><a [routerLink]="['appointments']">My Appointments</a></li>
        <li><a [routerLink]="['search']">Search Businesses</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class CustomerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
