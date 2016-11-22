import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-event-detail',
  templateUrl: './calendar-event-detail.component.html',
  styles: []
})
export class CalendarEventDetailComponent {
  @Input() selectedEvent: any
  @Input() eventType: string
  constructor() { }

}
