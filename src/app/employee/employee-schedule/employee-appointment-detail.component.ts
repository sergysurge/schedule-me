import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-employee-appointment-detail',
  templateUrl: './employee-appointment-detail.component.html',
  styles: []
})
export class EmployeeAppointmentDetailComponent implements OnInit {
  @Input() selectedEvent: any
  @Input() eventType: string

  constructor() { }

  ngOnInit() {
  }


}
