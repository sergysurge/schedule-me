import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { CustomerService } from '../customer.service'
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-select-employee-form',
  template: `
    <div class="form-group">
        <label for="options">Employees: </label>
        <div *ngFor="let employee of employees" class="input-group">
          <input type="checkbox" value="true" (change)="updateChecked(employee, $event)" checked>
          {{employee.firstName}} {{employee.lastName}}
        </div>
    </div>
  `,
  styles: []
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
  
  updateChecked(employee, $event) {
      this.checkedEmployees[employee.id] = !this.checkedEmployees[employee.id]
      this.checkedEmployeeChange.emit(this.checkedEmployees)
  }
}