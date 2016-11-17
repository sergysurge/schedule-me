import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
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

  private mapUserCompanyIdToUser: any = {}
  private companyIdSubscription: Subscription
  private calendarSubscription: Subscription
  // private schedulesSubscription: Subscription
  // private appointmentsSubscription: Subscription
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
        (employees) => { 
          this.employees = employees 
          console.log(this.employees, 'this.employees')
          this.employees.reduce((map, employee) => {
            map[employee.UserCompany.id] = {
              employeeId: employee.id,
              firstName: employee.firstName,
              lastName: employee.lastName
            }
            return map
          }, this.mapUserCompanyIdToUser)
        }
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

    this.calendarSubscription = this.customerService.getCompanySchedulesAndAppointments(this.companyId)
      .subscribe(
        (data) => {
          this.companyAppointments = data[0].map((appointment) => {
            return {
              employeeId: appointment.employeeId,
              employeeFirstName: appointment.employee.firstName,
              employeeLastName: appointment.employee.LastName,
              startTime: appointment.startTime,
              endTime: appointment.endTime
            }
          })
          this.companySchedules = data[1].map((schedule) => {
            return {
              employeeId: this.mapUserCompanyIdToUser[schedule.UserCompanyId].employeeId,
              employeeFirstName: this.mapUserCompanyIdToUser[schedule.UserCompanyId].firstName,
              employeeLastName: this.mapUserCompanyIdToUser[schedule.UserCompanyId].lastName,
              startTime: schedule.startTime,
              endTime: schedule.endTime
            }
          })
          this.employeeAppointments = this.categorizeByEmployeeId(this.companyAppointments)
          this.employeeSchedules = this.categorizeByEmployeeId(this.companySchedules)
          console.log('apppointments: ', this.employeeAppointments)
          console.log('schedules: ', this.employeeSchedules)

          // this.employeeAppointments = this.filterSchedulesByEmployee(this.companyAppointments)
        }
      )
  }

  ngOnDestroy() {
    this.companyIdSubscription && this.companyIdSubscription.unsubscribe()
    this.calendarSubscription && this.calendarSubscription.unsubscribe()
    // this.schedulesSubscription && this.schedulesSubscription.unsubscribe()
    // this.appointmentsSubscription && this.schedulesSubscription.unsubscribe()
  }

  categorizeByEmployeeId(schedules) {
    // filters schedules by employeeId, { <employeeId>: <[schedules]>}
    return schedules.reduce((filtered, schedule) => {
      if (filtered[schedule.employeeId]) {
        filtered[schedule.employeeId].push(schedule)
        return filtered
      }
      filtered[schedule.employeeId] = [schedule]
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