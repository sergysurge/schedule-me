import { Component, OnInit, ElementRef } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-employee-schedule',
  template: `
    <p>employee schedule</p>
    <app-calendar [calendarConfig]="calendarConfig"></app-calendar>
  `,
  styles: []
})
export class EmployeeScheduleComponent implements OnInit {

  constructor(private employeeService: EmployeeServiceService) { }

  calendarConfig: any
  appointments: any[]
  schedules: any[]
  calendars: any[]
  userId: number = 1
  userCompanyId: number = 1

  headers = {
    left: 'prev, next, today',
    center: 'title',
    right: 'month, agendaWeek, agendaDay, listDay'
  }

  ngOnInit() {
    this.employeeService.getEmployeeCalendarData(userId, userCompanyId)
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
              color: 'blue'
            },
            {
              appointments: this.appointments,
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


}
