import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../customer.service'
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-make-appointment-company-profile',
  template: `
    <div>
      <div class="page-header">
        <h2>{{company?.name}}</h2>
      </div>
      <div id="contact">
        <div>
          <span>Phone Number: {{company?.phoneNumber}}</span>
        </div>
        <div>
          <span>Website: {{company?.website}}</span>
        </div>
      <div id="image">
        <img src={{company?.image}}>
      </div>
      <div id="description">
        {{company?.description}}
      </div>
    </div>
  `,
  styles: []
})
export class MakeAppointmentCompanyProfileComponent implements OnInit {

  @Input() company: any

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

}
