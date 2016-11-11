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
  calendarConfig: any;
  calendarEvents: any[] = [];

  headers = {
    left: 'prev, next, today',
    center: 'title',
    right: 'month, agendaWeek, agendaDay, listDay'
  }

  ngOnInit() {
    this.employeeService.getEmployeeCalendarData(6)
      .subscribe(
        (calendarEntries) => {
          this.calendarEvents = calendarEntries.json().map((calendarEntry) => {
            return {
              title: calendarEntry.comment,
              start: calendarEntry.startTime,
              end: calendarEntry.endTime
            }
          })
          this.calendarConfig = {
            header: this.headers,
            defaultView: 'agendaWeek',
            events: this.calendarEvents,
            editable: true
          }
        }
      )
  }


}
