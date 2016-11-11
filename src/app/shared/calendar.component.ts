import { Component, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
import * as jQuery from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
require('style-loader!fullcalendar/dist/fullcalendar.css');


@Component({
  selector: 'app-calendar',
  template: `<div></div>`
})
export class CalendarComponent implements AfterViewInit {

  constructor(private el: ElementRef) { }
  
  @Input() calendarConfig
  schedule: any;

  // headers = {
  //   left: 'prev, next, today',
  //   center: 'title',
  //   right: 'month, agendaWeek, agendaDay, listDay'
  // }
  // x: any = moment("2016-11-10T19:19", moment.ISO_8601);
  // y: any = moment("2016-11-10T22:19", moment.ISO_8601);
  
  // events: any[] = [{title: 'blah', start: this.x, end: this.y}];

  // calendarConfig = {
  //   header: this.headers,
  //   defaultView: 'agendaWeek',
  //   events: this.events,
  //   editable: true
  // }

  ngAfterViewInit() {
    this.schedule = jQuery(this.el.nativeElement.children[0]);
    this.schedule.fullCalendar(this.calendarConfig);
  }

}
