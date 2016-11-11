import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-employee-schedule',
  template: `
    <p>employee schedule</p>
    <app-calendar [calendarConfig]="calendarConfig"></app-calendar>
  `,
  styles: []
})
export class EmployeeScheduleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
