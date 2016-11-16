import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-make-appointment',
  template: `
    <app-make-appointment-company-profile [company]="company"></app-make-appointment-company-profile>
    <app-calendar [calendarConfig]="calendarConfig"></app-calendar>
  `,
  styles: []
})
export class MakeAppointmentComponent implements OnInit, OnDestroy {
  public company: any
  public employeeSchedules: any
  private companyIdSubscription: Subscription
  private calendarSubscription: Subscription
  private calendarConfig: any
  private companyId: number
  private eventSources: Array<any>
  
  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  headers = {
    left: 'prev, next, today',
    center: 'title',
    right: 'month, agendaWeek, agendaDay'
  }

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

    this.calendarSubscription = this.customerService.getCompanyCalendarData(this.companyId)
      .subscribe(
        (res) => {
          this.employeeSchedules = res
        },
        (err) => {console.error(err)}
      )
  }

  ngOnDestroy() {
    this.companyIdSubscription && this.companyIdSubscription.unsubscribe()
    this.calendarSubscription && this.calendarSubscription.unsubscribe()
  }

}

// this.eventSources = [
//   {
//     event: this.employeeCalendar
//   }
// ]

//           this.calendarConfig = {
//             header: this.headers,
//             defaultView: 'agendaWeek',
//             eventSources: this.eventSources,
//             editable: false,
//             eventClick: this.handleEventClick
//           }