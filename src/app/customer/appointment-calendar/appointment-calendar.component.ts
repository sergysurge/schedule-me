import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer.service';
import * as moment from 'moment';
import { CustomerAppointmentEvent } from './customer-appointment-event';

@Component({
  selector: 'app-appointment-calendar',
  template: `
    <h3>My Appointments</h3>

    <div id="calendar">
      <app-calendar [calendarConfig]="calendarConfig"></app-calendar>
    </div>
    
    <div id="appointments">

      <h4>My Upcoming Appointments</h4>

      <div class="appointment-box" *ngFor="let appointment of customerAppointments">
        <span class="company-name">{{appointment.company.name}}</span>
        <br>
        <span class="appointment-description">{{appointment.description}}</span>
        <br>
        <span class="appointment-start">{{appointment.startTime | date: 'MMM d, y h:mm a'}}</span>
      </div>

    </div>
  `,
  styles: [`
    #calendar {
      height: 600px;
      font-size: 14px;
      padding: 0px 250px;
      overflow: scroll;
    }
    #appointments {
      margin: auto;
    }
    .appointment-box {
      width: 300px;
      height: 100px;
      float: left;
      border: 2px solid black;
      margin: 20px 20px;
      padding: 20px 20px;
    }

  `]
})
export class AppointmentCalendarComponent implements OnInit, OnDestroy {

  constructor(private customerService: CustomerService) { }

//   interface CustomerAppointmentEvent {
//     id?: number;
//     contactName?: string;
//     contactNumber?: string;
//     description?: string;
//     startTime?: any;
//     endTime?: any;
//     comment?: string;
//     customerId?: number;
//     employeeId?: number;
//     companyId?: number;
//     employee?: any;
//     company?: any;
//  }
  calendarConfig: any
  customerAppointments: Array<any>
  customerCalendarEvents: Array<any>
  userId: number = 6
  subscription: any
  

  headers = {
    left: 'prev, next, today',
    center: 'title',
    right: 'month, agendaWeek, agendaDay, listDay'
  }

  ngOnInit() {
    this.subscription = this.customerService.getCustomerAppointments(this.userId)
      .subscribe(
        (appointments) => {
          this.customerAppointments = appointments
          this.customerCalendarEvents = this.customerAppointments
            .map((appointment) => {
              const comment = `${appointment.description} at ${appointment.company.name}`
              return {
                title: comment,
                start: appointment.startTime,
                end: appointment.endTime
              }
            }
          )
          
          this.calendarConfig = {
            header: this.headers,
            defaultView: 'agendaWeek',
            events: this.customerCalendarEvents,
            editable: false,
            eventClick: this.handleEventClick
          }

        },
        (err) => console.error(err)
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  handleEventClick(calEvent, jsEvent, view) {
    console.log(calEvent)
  }

  // filterCalendarData(appointments) {
  //   appointments.reduce((appointment) => {

  //   })
  // }
}
