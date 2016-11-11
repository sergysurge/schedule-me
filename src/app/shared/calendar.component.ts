import { Component, OnInit, AfterViewInit, ElementRef, Input, OnChanges } from '@angular/core';
import * as jQuery from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
require('style-loader!fullcalendar/dist/fullcalendar.css');


@Component({
  selector: 'app-calendar',
  template: `<div></div>`
})
export class CalendarComponent implements OnChanges {

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
  }

  ngOnChanges(changes:any) {
    // set options for calendar only after receiving data from parent component
    var configChange = changes.calendarConfig.currentValue;
    if(configChange) {
      this.schedule.fullCalendar(this.calendarConfig);
    }
    
  }

}
