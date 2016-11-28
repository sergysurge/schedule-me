import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customer-appointment-detail',
  templateUrl: './customer-appointment-detail.component.html',
  styles: [
    `
      .panel-heading {
        background-color: #007ea7;
        color: white;
        text-align: center;
      }
      .appointment-details {
        font-size: 16px;
      }
      .borderless td, .borderless tr, .borderless th {
        border: none;
      }
      .employee-contact {
        width: 80%;
        margin: auto;
        text-align: center;
      }
      .employee-image {
        width: 50%;
        height: auto;
        border-radius: 4px;
      }
    `
  ]
})
export class CustomerAppointmentDetailComponent {
  public showContact: boolean = false
  @Input() selectedAppointment: any
  constructor() { }
  
  onContactClick() {
    this.showContact = !this.showContact
  }

}
