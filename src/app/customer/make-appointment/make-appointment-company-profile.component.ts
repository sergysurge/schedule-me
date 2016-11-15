import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../customer.service'
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-make-appointment-company-profile',
  template: `
    <p>
      make-appointment-company-profile Works!
    </p>
    <div>
      <h2>{{company?.name}}</h2>
      <div id="contact">
        <div>
          <span>Phone Number: {{company?.phoneNumber}}</span>
        </div>
        <div>
          <span>Website: {{company?.website}}</span>
        </div>
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
