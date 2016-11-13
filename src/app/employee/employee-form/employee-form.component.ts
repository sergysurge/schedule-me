import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment'

import {SelectItem} from 'primeng/primeng';

import {EmployeeServiceService} from '../employee-service.service'

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
    date : Date ; 
    public user: {}
    employees: SelectItem[];
    hours: SelectItem[];
    services: SelectItem[];
    start;
    times;

    person = {
      contactName: '',
      contactNumber: '',
      description: undefined,
      startTime: undefined,
      endTime: undefined,
      customerId :'1',
      employeeId : '',
      companyId : '1'
    }
  @Output() clicked = new EventEmitter<string>();

  makeAppointment(employeeServiceService:EmployeeServiceService){
    let start = moment(this.start).utcOffset(0)
    this.times = this.times.toString().split(':')
    start.set({'hour': this.times[0], 'minute': this.times[1]})
    this.person.startTime = start


    let end = moment(start)
    end.add(this.person.description[0].value,'m')
    this.person.description = this.person.description[0].label
    this.person.endTime = end

    // console.log('person end',this.person)
    this.employeeServiceService.makeAppointment(this.person)
    .then(
      appointment => {
        console.log(appointment)
        }
    )
  }

    constructor(private employeeServiceService:EmployeeServiceService) {
 
        employeeServiceService.getEmployees(3)
        .subscribe(
          employee => {
          this.employees = employee.json().response.employees
        }
        )

        this.employees = [];
        
        this.hours = []
        this.hours.push({label: "09:00 AM",value: "09:00"})
        this.hours.push({label: "09:15 AM",value: "09:15"})
        this.hours.push({label: "09:30 AM",value: "09:30"})
        this.hours.push({label: "09:45 AM",value: "09:45"})
        this.hours.push({label: "10:00 AM",value: "10:00"})
        this.hours.push({label: "10:15 AM",value: "10:15"})
        this.hours.push({label: "10:30 AM",value: "10:30"})
        this.hours.push({label: "10:45 AM",value: "10:45"})
        this.hours.push({label: "11:00 AM",value: "11:00"})
        this.hours.push({label: "11:15 AM",value: "11:15"})
        this.hours.push({label: "11:30 AM",value: "11:30"})
        this.hours.push({label: "11:45 AM",value: "11:45"})
        this.hours.push({label: "12:00 PM",value: "12:00"})
        this.hours.push({label: "12:15 PM",value: "12:15"})
        this.hours.push({label: "12:30 PM",value: "12:30"})
        this.hours.push({label: "12:45 PM",value: "12:45"})
        this.hours.push({label: "01:00 PM",value: "13:00"})
        this.hours.push({label: "01:15 PM",value: "13:15"})
        this.hours.push({label: "01:30 PM",value: "13:30"})
        this.hours.push({label: "01:45 PM",value: "13:45"})
        this.hours.push({label: "02:00 PM",value: "14:00"})
        this.hours.push({label: "02:15 PM",value: "14:15"})
        this.hours.push({label: "02:30 PM",value: "14:30"})
        this.hours.push({label: "02:45 PM",value: "14:45"})
        this.hours.push({label: "03:00 PM",value: "15:00"})
        this.hours.push({label: "03:15 PM",value: "15:15"})
        this.hours.push({label: "03:30 PM",value: "15:30"})
        this.hours.push({label: "03:45 PM",value: "15:45"})
        this.hours.push({label: "04:00 PM",value: "16:00"})
        this.hours.push({label: "04:15 PM",value: "16:15"})
        this.hours.push({label: "04:30 PM",value: "16:30"})
        this.hours.push({label: "04:45 PM",value: "16:45"})
        this.hours.push({label: "05:00 PM",value: "17:00"})
        this.hours.push({label: "05:15 PM",value: "17:15"})
        this.hours.push({label: "05:30 PM",value: "17:30"})
        this.hours.push({label: "05:45 PM",value: "17:45"})
        this.hours.push({label: "06:00 PM",value: "18:00"})
        this.hours.push({label: "06:15 PM",value: "18:15"})
        this.hours.push({label: "06:30 PM",value: "18:30"})
        this.hours.push({label: "06:45 PM",value: "18:45"})
        this.hours.push({label: "07:00 PM",value: "19:00"})
        this.hours.push({label: "07:15 PM",value: "19:15"})
        this.hours.push({label: "07:30 PM",value: "19:30"})
        this.hours.push({label: "07:45 PM",value: "19:45"})
        this.hours.push({label: "08:00 PM",value: "20:00"})

        this.services =[]
        this.services.push({label: "Manicure",value: 15})
        this.services.push({label: "Pedicure",value: 30})
        this.services.push({label: "Wax",value: 15})  
  }

}
