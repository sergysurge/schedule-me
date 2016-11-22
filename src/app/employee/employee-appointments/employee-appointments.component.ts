import { Component } from '@angular/core';

import { EmployeeServiceService } from '../employee-service.service'

@Component({
  selector: 'app-employee-appointments',
  templateUrl: './employee-appointments.component.html'
})
export class EmployeeAppointmentsComponent {

  constructor(employeeServiceService:EmployeeServiceService) { 
  
  }

  appointments;
}
