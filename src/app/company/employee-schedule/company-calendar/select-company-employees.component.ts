import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CustomerService } from '../../../customer/customer.service'
@Component({
  selector: 'app-select-company-employees',
  templateUrl: './select-company-employees.component.html',
  styleUrls: ['./select-company-employees.component.css']
})
export class SelectCompanyEmployeesComponent implements OnChanges {

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
