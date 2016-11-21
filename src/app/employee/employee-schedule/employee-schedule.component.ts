import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Rx'

@Component({
  selector: 'app-employee-schedule',
  template: `
    <div id="employee-calendar">
      <app-calendar [calendarConfig]="calendarConfig" [eventSources]="eventSources"></app-calendar>
    </div>
  `,
  styles: [`
    #employee-calendar {
      height: 500px;
      font-size: 14px;
      padding: 0px 250px;
      overflow: scroll;
    }
  `]
})
export class EmployeeScheduleComponent implements OnInit, OnDestroy {
  calendarConfig: any
  appointments: any[]
  schedules: any[]
  eventSources: any[]
  userId: number
  headers: any
  private userAssociations
  private calendarSubscription: Subscription

  constructor(private employeeService: EmployeeServiceService, private authService: AuthService) {
    this.headers = {
      left: 'prev, next, today',
      center: 'title',
      right: 'month, agendaWeek, agendaDay, listDay'
    }

    this.calendarConfig = {
      header: this.headers,
      defaultView: 'agendaWeek',
      eventSources: [],
      editable: true
    }
  }

  ngOnInit() {

    this.userAssociations = this.authService.getUserAssociations()
    this.userId = Number(localStorage.getItem('userId'))
    let userCompanyIds = Object.keys(this.userAssociations)
    this.calendarSubscription = this.employeeService.getEmployeeCalendarData(this.userId, userCompanyIds)
      .subscribe(
        (calendarEntries) => {
          this.schedules = calendarEntries[0]
            .map((calendarEntry) => {
              return {
                title: calendarEntry.description,
                start: calendarEntry.startTime,
                end: calendarEntry.endTime
              }
            })

          this.appointments = calendarEntries[1]
            .map((calendarEntry) => {
              return {
                title: calendarEntry.description,
                start: calendarEntry.startTime,
                end: calendarEntry.endTime
              }
            })

          this.eventSources = [
            {
              events: this.schedules,
              color: 'light blue'
            },
            {
              events: this.appointments,
              color: 'green'
            }
          ]
        },
        (err) => console.error(err)
      )
  }

  ngOnDestroy() {
    this.calendarSubscription && this.calendarSubscription.unsubscribe()
  }

}
