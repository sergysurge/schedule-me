import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer-appointment-detail',
  templateUrl: './customer-appointment-detail.component.html',
  styles: []
})
export class CustomerAppointmentDetailComponent implements OnInit {

  @Input() selectedAppointment: any
  constructor() { }

  ngOnInit() {
  }

}
