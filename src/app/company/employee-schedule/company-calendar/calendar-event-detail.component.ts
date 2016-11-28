import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-event-detail',
  templateUrl: './calendar-event-detail.component.html',
  styles: [
    `
      .panel-heading {
        background-color: #007ea7;
        color: white;
        text-align: center;
      }
      table {
        font-size: 16px;
      }
      .borderless td, .borderless tr, .borderless th {
        border: none;
      }
    `

  ]
})
export class CalendarEventDetailComponent {
  @Input() selectedEvent: any
  @Input() eventType: string
  constructor() { }

}
