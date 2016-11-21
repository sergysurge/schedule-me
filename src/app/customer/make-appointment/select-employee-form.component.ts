import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { CustomerService } from '../customer.service'
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-select-employee-form',
  templateUrl: './select-employee-form.component.html',
  styleUrls: ['./select-employee-form.component.css']
})
export class SelectEmployeeFormComponent implements OnChanges {

  @Input() employees: any
  @Output() checkedEmployeeChange = new EventEmitter()
  checkedEmployees = {}

  constructor(private customerService: CustomerService) { }

  ngOnChanges(changes: any) {
    let employeeChanges = changes.employees.currentValue;
    if(employeeChanges) {
      this.employees = employeeChanges
    }
    this.employees.reduce((mapped, employee) => {
      mapped[employee.id] = true
      return mapped
    }, this.checkedEmployees)
  }
  
  updateChecked(employee) {
      this.checkedEmployees[employee.id] = !this.checkedEmployees[employee.id]
      this.checkedEmployeeChange.emit(this.checkedEmployees)
  }
}