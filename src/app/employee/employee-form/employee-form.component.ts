import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

    selectedEmployee: string = 'Lucy';

    person = {
      name: '',
      number: '',
      employee: '',
      date: '',
      times: '',
      service: ''
    }
  @Output() clicked = new EventEmitter<string>();
    onClicked(){
    alert(this.employees);
    this.clicked.emit('It works!')
    }
    constructor(employeeServiceService:EmployeeServiceService) {
       
        employeeServiceService.getEmployees(1)
        .subscribe(
          employee => {
          this.employees = employee.json().response.employees
          console.log("emmmmmmmpppploooyyeees", this.employees)
        }
        )

        this.employees = [];
        this.employees.push({label: 'Lucy', value: 'Audi'});
        this.employees.push({label: 'Chris', value: 'BMW'});
        this.employees.push({label: 'Serge', value: 'Fiat'});
        this.employees.push({label: 'Marco', value: 'Ford'});
        
        this.hours = []
        this.hours.push({label: "9:00",value: "9:00"})
        this.hours.push({label: "10:00",value: "10:00"})
        this.hours.push({label: "11:00",value: "11:00"})
        this.hours.push({label: "12:00",value: "12:00"})

        this.services =[]
        this.services.push({label: "Manicure",value: "Manicure"})
        this.services.push({label: "Pedicure",value: "Pedicure"})
        this.services.push({label: "Wax",value: "Wax"})
        
  }
}
