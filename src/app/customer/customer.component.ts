import { Component, OnInit } from '@angular/core';
// import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';

@Component({
  selector: 'app-customer',
  template: `
    <p>
      customer works!
    </p>

    <ul>
      <li><a [routerLink]="['account']">My Account</a></li>
      <li><a [routerLink]="['appointments']">My Appointments</a></li>
      <li><a [routerLink]="['search']">Search Businesses</a></li>
    </ul>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class CustomerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
