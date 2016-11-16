import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Rx'

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: []
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
  userId = localStorage.getItem('userId')
  private subscription: Subscription
  

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
              let comment = ''
              if(appointment.description && appointment.company) {
                comment = `${appointment.description} at ${appointment.company.name}`
              } 
              return {
                title: comment,
                start: appointment.startTime,
                end: appointment.endTime
              }
            })
          
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
    this.subscription && this.subscription.unsubscribe()
  }

  handleEventClick(calEvent, jsEvent, view) {
    console.log(calEvent)
  }

  // filterCalendarData(appointments) {
  //   appointments.reduce((appointment) => {

  //   })
  // }
}
