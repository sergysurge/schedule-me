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
  public calendarConfig: any
  public customerAppointments: Array<any>
  public customerCalendarEvents: Array<any>
  public eventSources: Array<any>
  userId = localStorage.getItem('userId')
  headers: any
  private subscription: Subscription

  constructor(private customerService: CustomerService) { 
    this.headers = {
      left: 'prev, next, today',
      center: 'title',
      right: 'month, agendaWeek, agendaDay, listDay'
    }
    this.calendarConfig = {
      header: this.headers,
      defaultView: 'agendaWeek',
      eventSources: [],
      editable: false
    }
  }

  ngOnInit() {
    this.subscription = this.customerService.getCustomerAppointments(this.userId)
      .subscribe(
        (appointments) => { 
          console.log('appointments: ', appointments)
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
          console.log(this.customerCalendarEvents, '++++++++74')
        
          this.eventSources = [{
            events: this.customerCalendarEvents,
            color: 'light blue'
          }]

        },
        (err) => console.error(err)
      )
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe()
  }
}
