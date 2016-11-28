import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment'
import { Subscription } from 'rxjs/Rx'
import {SelectItem} from 'primeng/primeng';

import { EmployeeServiceService } from '../../employee/employee-service.service'
import { AuthService } from '../../auth/auth.service'
import { CompanyService } from '../../company/company.service'
import { CustomerService } from '../customer.service'
declare var swal: any;


// import { EmployeeServiceService } from '../employee/employee-service.service'

@Component({
  selector: 'app-schedule-appointment',
  template: `
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
        <option *ngFor="let hour of scheduleStorage" [value]="hour">{{hour.label}}</option>
      </select>
    </div>
    </div>

    <button (click)='makeAppointment()' class="btn btn-default">Submit</button>
  </form>
  `,

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
    scheduleStorage = [];

    public appointmentSuccess: boolean = false
    public serverError: boolean = false
    private subscription: Subscription
    private companyIdSubscription: Subscription


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

  ngOnInit(){
    
    // this.companyIdSubscription = this.customerService.getCompanyId()
    //   .subscribe(
    //     (companyId) => {
    //       console.log('asdasdf', companyId)
    //       this.companyId = companyId
    //       this.person.companyId = this.companyId

    //     this.employeeServiceService.getEmployees(this.person.companyId)
    //     .subscribe(
    //       employee => {
    //       this.employees = employee.json()[0].users
    //       console.log('get employees ln 116', this.employees)
    //     }
    //     )

    //     this.companyService.getOptions(this.person.companyId)
    //       .subscribe(options=>{
    //         console.log(options)
    //         this.services = options
    //     })
    //     })
  }

  getTime(employeeServiceService:EmployeeServiceService){
    this.scheduleStorage = []
    this.temp = undefined
    let arr= []
    let arr2= []
    let current = []
    // let values.mapent = []
    if(this.person.employeeId === undefined || this.person.description === undefined){
       swal("Oops...", "Please select all fields!", "error")
    }else{
      // console.log('this is company id',this.companyId)
      this.employees.forEach(curr=>{
        arr.push(curr)
      })
      arr.forEach(curr=>{
        arr2.push(curr.UserCompany.id)
      })
      // console.log('arr2', arr2)
      this.employeeServiceService.getSchedule(arr2)
      .then(
        schedule => { 
          // console.log('this.schedule',schedule)
          this.available = schedule
          this.available.forEach(curr=>{
            current.push(curr)
          })

          current.forEach((curr , i) =>{
            if(curr.UserCompanyId === this.person.employeeId.UserCompany.id && moment(curr.startTime).isSame(this.start,'day')){
              this.available = JSON.parse(curr.block)
              this.temp = curr
            }
          })
          if(this.temp === undefined){
            swal("Please select another day!", "They're not currently schedule to work", "error")
          }else{
            for(var i = 0; i <this.available.length-(this.person.description[0].duration)/15; i++){
              let conflict = false;
              for(let j = 0; j < ((this.person.description[0].duration)/15); j++){
                if(this.available[i+j].label === "Not available"){
                  conflict = true;
                }
              }
              if(!conflict){
                this.scheduleStorage.push(this.available[i])
              }
            }
          }
        }
      )
    }
  }

  
  editBlock(){
      let remove = this.available.indexOf(this.open[0])
      for(var i = remove; i< remove+(this.person.description[0].duration)/15; i++){
        console.log(this.available[i], i, 'asdf')
        this.available[i].label = "Not available"
      }
      
      this.temp.block = JSON.stringify(this.available)

      this.employeeServiceService.updateBlock(this.temp)
      .then(
        update => {console.log(update)}
      )
  }

  makeAppointment(employeeServiceService:EmployeeServiceService){
    // debugger;
      if(this.person.contactName === undefined || this.person.employeeId === undefined || this.person.description === undefined|| this.open === undefined){
        swal("Oops...", "Please select all fields!", "error")
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
            this.appointmentSuccess = true
            this.newAppointment.emit(appointment)
            swal("Appointment Made!", "Your appointment has been succesfully made!", "success")
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

ngOnDestroy() {
  this.subscription && this.subscription.unsubscribe()
}

    constructor(private employeeServiceService:EmployeeServiceService, private authService: AuthService, private companyService: CompanyService,private customerService: CustomerService) {

      
      this.person.customerId = localStorage.getItem('userId')
      this.person.companyId =localStorage.getItem('localCompanyId')
      employeeServiceService.getEmployees(this.person.companyId)
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
