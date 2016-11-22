import { Component, OnInit, ElementRef, OnDestroy, SimpleChanges, OnChanges, Input } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Rx'

@Component({
  selector: 'app-employee-schedule',
  template: `
    <div class="row">
      <div class="col-sm-7">
        <app-calendar [calendarConfig]="calendarConfig" [eventSources]="eventSources"></app-calendar>
      </div>
      <div class="col-sm-5">
        <app-employee-appointment-detail [selectedEvent]="selectedEvent" [eventType]="eventType"></app-employee-appointment-detail>
      </div>
  `,
  styles: []
})
export class EmployeeScheduleComponent implements OnInit, OnDestroy, OnChanges {
  calendarConfig: any
  appointments: any[]
  schedules: any[]
  eventSources: any[]
  userId: number
  headers: any
  selectedEvent: any
  schedulesRaw: any[]
  appointmentsRaw: any[]
  eventType: string
  companyId: number
  userCompanyId: number
  private userAssociations
  private calendarSubscription: Subscription
  private companyIdSubscription: Subscription

  @Input() newAppointment: any

  constructor(private employeeService: EmployeeServiceService, private authService: AuthService) {
    this.headers = {
      left: 'prev, next, today',
      center: 'title',
      right: 'month, agendaWeek, agendaDay, listMonth'
    }

    this.calendarConfig = {
      header: this.headers,
      defaultView: 'agendaWeek',
      eventSources: [],
      editable: false,
      eventClick: (calEvent, jsEvent, view) => {
        this.onCalendarEventClick(calEvent)
      }
    }
  }

  ngOnInit() {

    this.userAssociations = this.authService.getUserAssociations()
    this.userId = Number(localStorage.getItem('userId'))

    this.companyIdSubscription = this.employeeService.getCompanyId()
      .subscribe(
        (companyId) => {
          console.log('getting inside cal', companyId, this.userAssociations)
          this.companyId = companyId
          // find corresponding userCompanyId
          for(let key in this.userAssociations) {
            if (this.userAssociations[key][0] === this.companyId) {
              this.userCompanyId = Number(key)
              console.log(this.userCompanyId, 'userCompanyId')
            }
          }
          this.getCalendarData(this.userId, this.userCompanyId)
        }
      )
  }
    // let userCompanyIds = Object.keys(this.userAssociations)
    getCalendarData(userId, userCompanyId) {
      this.calendarSubscription = this.employeeService.getEmployeeCalendarData(userId, userCompanyId)
        .subscribe(
          (calendarEntries) => {
            this.schedulesRaw = calendarEntries[0]
            this.schedules = calendarEntries[0]
              .map((calendarEntry) => {
                console.log(calendarEntry)
                return {
                  id: calendarEntry.id,
                  title: 'Work',
                  start: calendarEntry.startTime,
                  end: calendarEntry.endTime
                }
              })
            
            this.appointmentsRaw = calendarEntries[1]
            this.appointments = calendarEntries[1]
              .map((calendarEntry) => {
                return {
                  id: calendarEntry.id,
                  title: `${calendarEntry.description || 'Appointment'} for ${calendarEntry.contactName}`,
                  start: calendarEntry.startTime,
                  end: calendarEntry.endTime
                }
              })

            this.eventSources = [
              {
                id: 0,
                events: this.schedules,
                color: 'light blue'
              },
              {
                id: 1,
                events: this.appointments,
                color: 'green'
              }
            ]
          },
          (err) => console.error(err)
        )

    }
  

  ngOnChanges(changes: SimpleChanges) {
    let newAppointment = changes["newAppointment"].currentValue
    if(newAppointment && newAppointment.employeeId === this.userId) {
      this.eventSources[1].events.push({
        title: `${newAppointment.description || 'Appointment'} for ${newAppointment.contactName}`,
        start: newAppointment.startTime,
        end: newAppointment.endTime
      })
    }
  }

  ngOnDestroy() {
    this.calendarSubscription && this.calendarSubscription.unsubscribe()
  }

  onCalendarEventClick(calEvent) {
    if (calEvent.source.id === 0) {
      for( let i = 0; i < this.schedulesRaw.length; i++) {
        if(this.schedulesRaw[i].id === calEvent.id) {
          this.selectedEvent = this.schedulesRaw[i]
          this.eventType = 'schedule'
        }
      }
    } else if (calEvent.source.id === 1) {
      for (let i = 0; i < this.appointmentsRaw.length; i++) {
        if (this.appointmentsRaw[i].id === calEvent.id) {
          this.selectedEvent = this.appointmentsRaw[i]
          this.eventType = 'appointment'
        }
      }
    }
  }
}
