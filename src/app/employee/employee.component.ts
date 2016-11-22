import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from './employee-service.service'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent {
  companies: any;
  user: any;
  appointment: any;
  current: any;

  constructor(private employeeServiceService:EmployeeServiceService,private authService: AuthService) { 
    this.user = this.authService.getUserAssociations()
    let id;
    for(var key in this.user){
      id = key
    }
    employeeServiceService.getUserCompanies(id)
    .then(companies =>{
      this.companies = companies
      console.log('this companies',this.companies)
    })
  }

  changeCompany(company){
    console.log('company', company)
  }
  onNewAppointment($event) {
    this.appointment = $event
  }
  

}
