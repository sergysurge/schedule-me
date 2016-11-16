import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-make-appointment',
  template: `
    <p>
      make-appointment Works!
    </p>
    <app-make-appointment-company-profile [company]="company"></app-make-appointment-company-profile>
    <app-calendar [calendarConfig]="calendarConfig"></app-calendar>
  `,
  styles: []
})
export class MakeAppointmentComponent implements OnInit, OnDestroy {
  public company: any
  private companyIdSubscription: Subscription
  private calendarSubscription: Subscription
  private companyId: number
  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit() {
    this.companyIdSubscription = this.route.params
      .subscribe(
        (params: any) => {
          this.companyId = params['companyId']
          this.customerService.getCompanyById(this.companyId)
            .subscribe(
              (company) => {this.company = company},
              (err) => console.log(err)
            )
        }
      )

    // this.calendarSubscription = this.customerService.getCompanyCalendar(this.companyId)
    //   .subscribe(())
  }

  ngOnDestroy() {
    this.companyIdSubscription && this.companyIdSubscription.unsubscribe()
  }

}
