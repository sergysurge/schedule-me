import { Component, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
import * as jQuery from 'jquery';
import 'fullcalendar';
import * as moment from 'moment';
require('style-loader!fullcalendar/dist/fullcalendar.css');


@Component({
  selector: 'app-calendar',
  template: `
    <div></div>
  `
})
export class CalendarComponent implements OnInit, AfterViewInit {

  constructor(private el: ElementRef) { }
  schedule: any;
  x: any = moment("2016-11-10T19:19", moment.ISO_8601);
  y: any = moment("2016-11-10T22:19", moment.ISO_8601);
  
  events: any[] = [{title: 'blah', start: this.x, end: this.y}];
  ngOnInit() {
    console.log(this.x, this.y);
  }
  ngAfterViewInit() {
    this.schedule = jQuery(this.el.nativeElement.children[0]);
    this.schedule.fullCalendar({defaultView: 'agendaWeek', events: this.events, editable: true});
    // this.schedule.fullCalendar({})
    // console.log(this.schedule.fullCalendar({}))
  }

}
