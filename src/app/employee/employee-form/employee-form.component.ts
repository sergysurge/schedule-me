import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment'

import {SelectItem} from 'primeng/primeng';

import { EmployeeServiceService } from '../employee-service.service'
import { AuthService } from '../../auth/auth.service'
import { CompanyService } from '../../company/company.service'


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
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
    
  @Output() clicked = new EventEmitter<string>();

  getTime(employeeServiceService:EmployeeServiceService){
    let arr= []
    let arr2= []
    let current = []
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

  editBlock(){
      let remove = this.available.indexOf(this.open[0])
      this.available.splice(remove,(this.person.description[0].duration)/15)
      this.temp.block = JSON.stringify(this.available)

      this.employeeServiceService.updateBlock(this.temp)
      .then(
        update => {console.log(update)}
      )
  }

  makeAppointment(employeeServiceService:EmployeeServiceService){

    if(this.person.contactName === undefined || this.person.employeeId === undefined || this.person.description === undefined){
      alert('Please select all fields')
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

      this.employeeServiceService.makeAppointment(this.person)
      .then(
        appointment => {
          console.log(appointment)
          }
      )
  }
}

    constructor(private employeeServiceService:EmployeeServiceService, private authService: AuthService, private companyService: CompanyService) {
        // this.available = employeeServiceService.available

        this.user = this.authService.getUserAssociations()
        for(var key in this.user){
          this.user.companyId = this.user[key][0]
          this.person.customerId = key
          this.person.companyId =this.user[key][0]
        }
        employeeServiceService.getEmployees(this.user.companyId)
        .subscribe(
          employee => {
          this.employees = employee.json()[0].users
        }
        )

        companyService.getOptions(this.user.companyId)
        .subscribe(options=>{
            this.services = options
        })

        this.employees = [];
 
  }

}
