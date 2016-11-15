import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-employee-schedule',
  template: `
    <p>employee schedule</p>
    <div id="employee-calendar">
      <app-calendar [calendarConfig]="calendarConfig"></app-calendar>
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

  constructor(private employeeService: EmployeeServiceService, private authService: AuthService) { }

  calendarConfig: any
  appointments: any[]
  schedules: any[]
  calendars: any[]
  userId: number
  userAssociations
  calendarSubscription

  headers = {
    left: 'prev, next, today',
    center: 'title',
    right: 'month, agendaWeek, agendaDay, listDay'
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

          this.calendars = [
            {
              events: this.schedules,
              color: 'blue'
            },
            {
              events: this.appointments,
              color: 'pink'
            }
          ]
          this.calendarConfig = {
            header: this.headers,
            defaultView: 'agendaWeek',
            eventSources: this.calendars,
            editable: true
          }
        },
        (err) => console.error(err)
      )
  }

  ngOnDestroy() {
    this.calendarSubscription.unsubscribe()
  }

}
