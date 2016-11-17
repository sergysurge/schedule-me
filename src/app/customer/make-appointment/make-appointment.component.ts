import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-make-appointment',
  template: `
    <app-make-appointment-company-profile [company]="company"></app-make-appointment-company-profile>
    <app-calendar [calendarConfig]="calendarConfig"></app-calendar>
    <ul>
      <li ><a>asdf</a></li>
    </ul>
  `,
  styles: []
})
export class MakeAppointmentComponent implements OnInit, OnDestroy {
  public company: any
  public companySchedules: any
  public calendarConfig: any
  public calendarHeaders: any
  public employeeSchedules: any
  public employeeAppointments: any
  public employees: any = []
  public companyAppointments: any
  private companyIdSubscription: Subscription
  private schedulesSubscription: Subscription
  private appointmentsSubscription: Subscription
  private companyId: number
  private eventSources: Array<any>
  
  constructor(private route: ActivatedRoute, private customerService: CustomerService) { }

  // this.calendarHeaders = {
  //   left: 'prev, next, today',
  //   center: 'title',
  //   right: 'month, agendaWeek, agendaDay'
  // }

  ngOnInit() {
    this.customerService.getEmployees()
      .subscribe(
        (employees) => { this.employees = employees }
      )

    this.companyIdSubscription = this.route.params
      .subscribe(
        (params: any) => {
          this.companyId = params['companyId']
          this.customerService.getCompanyById(this.companyId)
            .subscribe(
              (company) => { this.company = company },
              (err) => { console.log(err) }
            )
        }
      )

    this.schedulesSubscription = this.customerService.getCompanySchedules(this.companyId)
      .subscribe(
        (res) => {
          console.log(res)
          this.companySchedules = res 
          this.employeeSchedules = this.filterSchedulesByEmployee(this.companySchedules)
        },
        (err) => { console.log(err) }
      )
    
    this.appointmentsSubscription = this.customerService.getCompanyAppointments(this.companyId)
      .subscribe(
        (res) => {
          this.companyAppointments = res
          this.employeeAppointments = this.filterSchedulesByEmployee(this.companyAppointments)
        },
        (err) => { console.log(err) }
      )
  }

  ngOnDestroy() {
    this.companyIdSubscription && this.companyIdSubscription.unsubscribe()
    this.schedulesSubscription && this.schedulesSubscription.unsubscribe()
    this.appointmentsSubscription && this.schedulesSubscription.unsubscribe()
  }

  filterSchedulesByEmployee(schedules) {
    // filters schedules by userCompanyId, { <userCompanyId>: <[schedules]>}
    return schedules.reduce((filtered, schedule) => {
      if (filtered[schedule.UserCompanyId]) {
        filtered[schedule.UserCompanyId].push(schedule)
        return filtered
      }
      filtered[schedule.UserCompanyId] = [schedule]
      return filtered
    }, {})
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