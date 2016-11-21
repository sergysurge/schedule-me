import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent {

  constructor() { }
  appointment: any

  onNewAppointment($event) {
    this.appointment = $event
  }
  

}
