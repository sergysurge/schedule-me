import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';

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

  constructor(private employeeService: EmployeeServiceService) { }

  calendarConfig: any
  appointments: any[]
  schedules: any[]
  calendars: any[]
  userId: number = 1
  userCompanyId: number = 1
  calendarSubscription

  headers = {
    left: 'prev, next, today',
    center: 'title',
    right: 'month, agendaWeek, agendaDay, listDay'
  }

  ngOnInit() {
    this.calendarSubscription = this.employeeService.getEmployeeCalendarData(this.userId, this.userCompanyId)
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

          console.log(this.schedules, this.appointments)

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
