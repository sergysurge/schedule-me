import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-appointment-calendar',
  template: `
    <p>
      appointment-calendar Works!
    </p>
    <app-calendar [calendarConfig]="calendarConfig"></app-calendar>
  `,
  styles: []
})
export class AppointmentCalendarComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  calendarConfig: any;
  calendarEvents: any[] = [];

  headers = {
    left: 'prev, next, today',
    center: 'title',
    right: 'month, agendaWeek, agendaDay, listDay'
  }
  // x: any = moment("2016-11-10T19:19", moment.ISO_8601);
  // y: any = moment("2016-11-10T22:19", moment.ISO_8601);
  
  // events: any[] = [{title: 'blah', start: this.x, end: this.y}];

  // calendarConfig = {
  //   header: this.headers,
  //   defaultView: 'agendaWeek',
  //   events: this.events,
  //   editable: true
  // }
  customerAppointments;
  ngOnInit() {
    this.customerService.getCustomerAppointments(1)
      .subscribe(
        (appointments) => {
          this.calendarEvents = appointments.json().map(
            (appointment) => {
              return {
                title: appointment.description,
                start: appointment.startTime,
                end: appointment.endTime
              }
            }
          )
          this.calendarConfig = {
            header: this.headers,
            defaultView: 'agendaWeek',
            events: this.calendarEvents,
            editable: false
          }
        },
        (err) => console.error(err)
      )

  
  }

}
