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

  constructor(private el: ElementRef) { 
  }
  
  @Input() calendarConfig
  @Input() eventSources
  schedule: any;

  // ngAfterViewInit() {
  //   this.schedule = jQuery(this.el.nativeElement.children[0]);
  // }

  ngOnChanges(changes:any) {
    if (!this.schedule) {
      this.schedule = jQuery(this.el.nativeElement.children[0])
    }
    if(changes.calendarConfig) {
      this.schedule.fullCalendar(changes.calendarConfig.currentValue)

    }
    if(changes.eventSources && changes.eventSources.currentValue) {
      this.schedule.fullCalendar('removeEventSources')
      for(let i = 0; i < changes.eventSources.currentValue.length; i++) {
        this.schedule.fullCalendar('addEventSource', changes.eventSources.currentValue[i])
      }
    }
    
  }

}
