import { Component, OnInit } from '@angular/core';
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';

@Component({
  selector: 'app-customer',
  template: `
    <p>
      customer works!
    </p>
    <app-appointment-calendar></app-appointment-calendar>
  `,
  styles: []
})
export class CustomerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
