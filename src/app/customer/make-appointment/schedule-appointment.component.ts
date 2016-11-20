import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment'

import {SelectItem} from 'primeng/primeng';

import { EmployeeServiceService } from '../../employee/employee-service.service'
import { AuthService } from '../../auth/auth.service'
import { CompanyService } from '../../company/company.service'


// import { EmployeeServiceService } from '../employee/employee-service.service'

@Component({
  selector: 'app-schedule-appointment',
  template: `
   <h1>Make Appointment</h1>
<form >
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" name="name" [(ngModel)]="person.contactName" placeholder="Name" >
    </div>
    <div class="form-group">
      <label>Number</label>
      <input type="text" class="form-control" name="number" [(ngModel)]="person.contactNumber" placeholder="Number">
    </div>
    <div class="form-group">
      <label>Employee</label>
    <select [(ngModel)]="person.employeeId" [ngModelOptions]="{standalone: true}">
      <option *ngFor="let employee of employees" [ngValue]="employee">
        {{employee.firstName}}
      </option>
    </select>
    <div class="ui-g-12 ui-md-4">
      <label>Date</label>
      <input type="date"  [(ngModel)]="start" [ngModelOptions]="{standalone: true}"/>
    </div>
    <div class="form-group">
      <label>Service</label>
      <select multiple name="service" class="form-control" [(ngModel)]="person.description" [ngModelOptions]="{standalone: true}">
        <option *ngFor="let service of services" [value]="service">{{service.service}}</option>
      </select>
    </div>
    <button (click)='getTime()' class="btn btn-default">check</button>
    <!--<div class="form-group">
      <label>Times</label>
      <select multiple name="hours" class="form-control" [(ngModel)]="times" [ngModelOptions]="{standalone: true}">
        <option *ngFor="let hour of hours" [value]="hour.value">{{hour.label}}</option>
      </select>
    </div>-->
    <div class="form-group">
      <label>Available</label>
      <select multiple name="available" class="form-control" [(ngModel)]="open" [ngModelOptions]="{standalone: true}">
        <option *ngFor="let hour of available" [value]="hour">{{hour.label}}</option>
      </select>
    </div>
    </div>

    <button (click)='makeAppointment()' class="btn btn-default">Submit</button>
  </form>
  `,
  styles: []
})
export class ScheduleAppointmentComponent {
  
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

  @Input() companyId

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

  checkBlock(){
    let check = this.available.indexOf(this.open[0])
    let dur = (this.person.description[0].duration)/15
    if(this.available[check+dur].label === "Not available"){
      return false
    }else{
      return true
    }
  }
  
  editBlock(){
      let remove = this.available.indexOf(this.open[0])
      for(var i = remove; i< remove+(this.person.description[0].duration)/15; i++){
        this.available[i].label = "Not available"
      }
      
      this.temp.block = JSON.stringify(this.available)

      // this.employeeServiceService.updateBlock(this.temp)
      // .then(
      //   update => {console.log(update)}
      // )
  }

  makeAppointment(employeeServiceService:EmployeeServiceService){

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
            }
        )
      }
    }
}

    constructor(private employeeServiceService:EmployeeServiceService, private authService: AuthService, private companyService: CompanyService) {



          this.person.customerId = localStorage.getItem('userId')
          this.person.companyId =localStorage.getItem('localCompanyId')
      
        employeeServiceService.getEmployees(this.person.companyId)
        .subscribe(
          employee => {
          this.employees = employee.json()[0].users
        }
        )

        companyService.getOptions(this.person.companyId)
        .subscribe(options=>{
            this.services = options
        })
        this.employees = [];
  }

}
