import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Rx'

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styles: [
    `
      .panel-heading {
        background-color: #008ea8;
        color: white;
        text-align: center;
      }
    `
  ]
})
export class AppointmentCalendarComponent implements OnInit, OnDestroy {
  public calendarConfig: any
  public customerAppointments: Array<any>
  public customerCalendarEvents: Array<any>
  public eventSources: Array<any>
  userId = localStorage.getItem('userId')
  selectedAppointment: any
  headers: any
  private subscription: Subscription

  constructor(private customerService: CustomerService) { 
    this.headers = {
      left: 'prev, next, today',
      center: 'title',
      right: 'month, agendaWeek, agendaDay, listMonth'
    }
    this.calendarConfig = {
      header: this.headers,
      defaultView: 'listMonth',
      eventSources: [],
      editable: false,
      eventClick: (calEvent, jsEvent, view) => {
        this.onCalendarEventClick(calEvent)
      }
    }
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
                id: appointment.id,
                title: comment,
                start: appointment.startTime,
                end: appointment.endTime
              }
            })
        
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

  onCalendarEventClick(calEvent) {
    for (let i = 0; i < this.customerAppointments.length; i++) {
      if (this.customerAppointments[i].id === calEvent.id) {
        this.selectedAppointment = this.customerAppointments[i]
      }
    }
  }
}
