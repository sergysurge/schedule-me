import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment'
import { Subscription } from 'rxjs/Rx'
import {SelectItem} from 'primeng/primeng';

import { EmployeeServiceService } from '../../employee/employee-service.service'
import { AuthService } from '../../auth/auth.service'
import { CompanyService } from '../../company/company.service'


// import { EmployeeServiceService } from '../employee/employee-service.service'

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styles: []
})
export class ScheduleAppointmentComponent implements OnDestroy {
  
  date : Date ; 
    user: any;
    employees: SelectItem[];
    hours: SelectItem[];
    services: SelectItem[];
    allschedule: SelectItem[];
    public available;
    start;
    times;
    open;
    service: {};
    temp;
    public appointmentSuccess: boolean = false
    public serverError: boolean = false
    private subscription: Subscription

    person = {
      contactName: undefined,
      contactNumber: undefined,
      description: undefined,
      startTime: undefined,
      endTime: undefined,
      customerId :undefined,
      employeeId : undefined,
      companyId : undefined
    }
    
  // @Output() clicked = new EventEmitter<string>();

  @Input() companyId
  @Output() newAppointment = new EventEmitter<any>()
  getTime(employeeServiceService:EmployeeServiceService){

    let arr= []
    let arr2= []
    let current = []
    // let values.mapent = []
    if(this.person.employeeId === undefined || this.person.description === undefined){
      alert('Please select all fields')
    }else{
      this.employees.forEach(curr=>{
        arr.push(curr)
      })
      arr.forEach(curr=>{
        arr2.push(curr.id)
      })

      this.employeeServiceService.getSchedule(arr2)
      .then(
        schedule => { 
          this.available = schedule
          this.available.forEach(curr=>{
            current.push(curr)
          })
          current.forEach(curr=>{
            if(curr.UserCompanyId === this.person.employeeId.UserCompany.id && moment(curr.startTime).isSame(this.start,'day')){
              this.available = JSON.parse(curr.block)
              this.temp = curr
            }
          })
          }
      )
    }
  }

  checkBlock(){
    let check = this.available.indexOf(this.open[0])
    let dur = (this.person.description[0].duration)/15
    console.log(this.available, 'avail')
    if(this.available[check+dur].label === "Not available"){
      return false
    }else{
      return true
    }
  }
  
  editBlock(){
      let remove = this.available.indexOf(this.open[0])
      for(var i = remove; i< remove+(this.person.description[0].duration)/15; i++){
        console.log(this.available[i], i, 'asdf')
        this.available[i].label = "Not available"
      }
      
      this.temp.block = JSON.stringify(this.available)

      // this.employeeServiceService.updateBlock(this.temp)
      // .then(
      //   update => {console.log(update)}
      // )
  }

  makeAppointment(employeeServiceService:EmployeeServiceService){
    // debugger;
      if(this.person.contactName === undefined || this.person.employeeId === undefined || this.person.description === undefined||this.open[0].label === "Not available"){
        if(this.open[0].label === "Not available"){
          alert('Appointment Not Available')
        }else{
          alert('Please select all fields')
        }
      }else{
        if(!this.checkBlock()){
          alert('Not enough time for the service')
        }else{
        this.editBlock()
        this.person.employeeId = this.person.employeeId.id
        let start = moment(this.start).utcOffset(0)
        this.open = this.open[0].value.toString().split(':')
        start.set({'hour': this.open[0], 'minute': this.open[1]})
        this.person.startTime = start

        let end = moment(start)
        end.add(this.person.description[0].duration,'m')
        this.person.description = this.person.description[0].service
        this.person.endTime = end

        console.log(this.person)
        this.employeeServiceService.makeAppointment(this.person)
        .then(
          appointment => {
            console.log(appointment)
            this.appointmentSuccess = true
            this.newAppointment.emit(appointment)
          }
        )
        .catch(
          (err) => {
            this.serverError = true
            console.log(err)
          }
        )
      }
    }
}

ngOnDestroy() {
  this.subscription && this.subscription.unsubscribe()
}

    constructor(private employeeServiceService:EmployeeServiceService, private authService: AuthService, private companyService: CompanyService) {



          this.person.customerId = localStorage.getItem('userId')
          this.person.companyId =localStorage.getItem('localCompanyId')
      
        this.subscription = employeeServiceService.getEmployees(this.person.companyId)
        .subscribe(
          employee => {
          this.employees = employee.json()[0].users
          console.log('get employees', this.employees)
        }
        )

        companyService.getOptions(this.person.companyId)
        .subscribe(options=>{
            this.services = options
        })
        this.employees = [];
  }

}
