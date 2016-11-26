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
      .appointment-details {
        font-size: 18px;
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
export class CustomerAppointmentDetailComponent implements OnInit {
  public showContact: boolean = false
  @Input() selectedAppointment: any
  constructor() { }

  ngOnInit() {
  }

  onContactClick() {
    this.showContact = !this.showContact
  }

}
