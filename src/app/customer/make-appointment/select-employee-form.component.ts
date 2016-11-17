import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../customer.service'
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-select-employee-form',
  template: `
    <div class="form-group">
        <label for="options">Employees: </label>
        <div *ngFor="let employee of employees">
            <input type="checkbox" value="{{employee.firstName}} {{employee.lastName}}"> {{employee.firstName}} {{employee.lastName}}
        </div>
    </div>
  `,
  styles: []
})
export class SelectEmployeeFormComponent implements OnInit {

  @Input() employees: any

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
      
  }

}