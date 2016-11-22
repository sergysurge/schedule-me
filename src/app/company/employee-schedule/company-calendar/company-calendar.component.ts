import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../../../customer/customer.service';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-company-calendar',
  templateUrl: './company-calendar.component.html',
  styles: [
    `
      div.fc-title {
        color: black;
      }
    `
  ]
})
export class CompanyCalendarComponent implements OnInit {

  @Input() companyId: any
  public companySchedules: any
  public calendarConfig: any
  public calendarHeaders: any
  public employeeSchedules: any
  public employeeAppointments: any
  public employees: any = []
  public companyAppointments: any
  public checkedEmployees: any = {} // keep track of selected employees for calendar
  public eventSources: Array<any> = []
  public selectedEvent: any
  public schedulesRaw: any[]
  public appointmentsRaw: any[]
  public eventType: string
  private mapUserCompanyIdToUser: any = {}
  private calendarSubscription: Subscription
  private employeeSubscription: Subscription

  constructor(private route: ActivatedRoute, private customerService: CustomerService) {
    this.calendarHeaders = {
      left: 'prev, next, today',
      center: 'title',
      right: 'month, agendaWeek, agendaDay, listMonth'
    }
    this.calendarConfig = {
      header: this.calendarHeaders,
      defaultView: 'agendaWeek',
      eventSources: [],
      editable: false,
      eventClick: (calEvent, jsEvent, view) => {
        this.onCalendarEventClick(calEvent)
      }
    }
  }

  ngOnInit() {
    this.employeeSubscription = this.customerService.getEmployees()
      .subscribe(
        (employees) => { 
          this.employees = employees 
          this.employees.forEach((employee) => {
            this.mapUserCompanyIdToUser[employee.UserCompany.id] = {
              employeeId: employee.id,
              firstName: employee.firstName,
              lastName: employee.lastName
            }
            this.checkedEmployees[employee.id] = true
          })
        }
      )

    this.calendarSubscription = this.customerService.getCompanySchedulesAndAppointments(this.companyId)
      .subscribe(
        (data) => {
          this.appointmentsRaw = data[0]
          this.companyAppointments = data[0].map((appointment) => {
            return {
              id: appointment.id,
              employeeId: appointment.employeeId,
              employeeFirstName: appointment.employee.firstName,
              employeeLastName: appointment.employee.lastName,
              startTime: appointment.startTime,
              endTime: appointment.endTime
            }
          })
          this.schedulesRaw = data[1]
          this.companySchedules = data[1].map((schedule) => {
            return {
              id: schedule.id,
              employeeId: this.mapUserCompanyIdToUser[schedule.UserCompanyId].employeeId,
              employeeFirstName: this.mapUserCompanyIdToUser[schedule.UserCompanyId].firstName,
              employeeLastName: this.mapUserCompanyIdToUser[schedule.UserCompanyId].lastName,
              startTime: schedule.startTime,
              endTime: schedule.endTime
            }
          })
          this.employeeAppointments = this.categorizeByEmployeeId(this.companyAppointments, 'appointment')
          this.employeeSchedules = this.categorizeByEmployeeId(this.companySchedules, 'schedule')   
          this.updateEventSources(this.employees)
        }
      )
  }

  onCheckedEmployeeChange(checkedEmployees) {
    let updatedEmployees = []
    for(var employee in checkedEmployees) {
      if (checkedEmployees[employee]) {
        let found = this.employees.find((emp) => { 
          return emp.id === Number(employee)
        })
        found !== -1 && updatedEmployees.push(found)
      }
    }
    this.updateEventSources(updatedEmployees)
  }

  ngOnDestroy() {
    this.calendarSubscription && this.calendarSubscription.unsubscribe()
    this.employeeSubscription && this.employeeSubscription.unsubscribe()
  }

  onNewSchedule($event) {
    let employee = this.mapUserCompanyIdToUser[$event.UserCompanyId]
    this.employeeAppointments[employee.id].push({
      title: `Apppointment for ${$event.contactName}`,
      start: $event.startTime,
      end: $event.endTime
    })
    this.updateEventSources(this.employees)
  }

  categorizeByEmployeeId(schedules, type) {
    let append = ''
    if (type === 'schedule') {
      append = 'working'
    } else if (type === 'appointment') {
      append = 'appointment'
    }
    // filters schedules by employeeId, { <employeeId>: <[schedules]>}
    return schedules.reduce((filtered, schedule) => {
      if (filtered[schedule.employeeId]) {
        filtered[schedule.employeeId].push({
          id: schedule.id,
          title: `${schedule.employeeFirstName} ${schedule.employeeLastName} ${append}`,
          start: schedule.startTime,
          end: schedule.endTime,
          className: type
        })
        return filtered
      }
      filtered[schedule.employeeId] = [{
          id: schedule.id,
          title: `${schedule.employeeFirstName} ${schedule.employeeLastName} ${append}`,
          start: schedule.startTime,
          end: schedule.endTime,
          className: type
      }]
      return filtered
    }, {})
  }

  updateEventSources(employees) {
    this.eventSources = []
    employees.forEach((employee) => {
      if(this.employeeSchedules[employee.id]) {
        this.eventSources.push({
          events: this.employeeSchedules[employee.id],
          color: 'light blue'
        })
        this.eventSources.push({
          events: this.employeeAppointments[employee.id],
          color: 'green'
        })
      }
    })
  }

  onCalendarEventClick(calEvent) {
    if (calEvent.className[0] === 'schedule') {
      for( let i = 0; i < this.schedulesRaw.length; i++) {
        if(this.schedulesRaw[i].id === calEvent.id) {
          this.selectedEvent = this.schedulesRaw[i]
          this.selectedEvent.employee = this.mapUserCompanyIdToUser[this.selectedEvent.UserCompanyId]
          this.eventType = 'schedule'
        }
      }
    } else if (calEvent.className[0] === 'appointment') {
      for (let i = 0; i < this.appointmentsRaw.length; i++) {
        if (this.appointmentsRaw[i].id === calEvent.id) {
          this.selectedEvent = this.appointmentsRaw[i]
          this.eventType = 'appointment'
        }
      }
    }
  }

}
