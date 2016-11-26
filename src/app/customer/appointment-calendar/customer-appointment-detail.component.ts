import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customer-appointment-detail',
  templateUrl: './customer-appointment-detail.component.html',
  styles: [
    `
      .panel-heading {
        background-color: #008ea8;
        color: white;
        text-align: center;
      }
    `
  ]
})
export class CustomerAppointmentDetailComponent implements OnInit {

  @Input() selectedAppointment: any
  constructor() { }

  ngOnInit() {
  }

}
