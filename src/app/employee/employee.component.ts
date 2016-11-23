import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from './employee-service.service'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  companies: any;
  user: any;
  appointment: any;
  current: any;
  id: any
  name: any;
 
  constructor(private employeeServiceService:EmployeeServiceService,private authService: AuthService) { 
    this.user = this.authService.getUserAssociations()
    this.id = localStorage.getItem('userId');
  }
  ngOnInit() {
    this.employeeServiceService.getUserCompanies(this.id)
      .then(companies =>{
        this.companies = companies
        this.name = this.companies[0].name
        this.employeeServiceService.setCompanyId(this.companies[0].id)
        console.log('this companies',this.companies)
      })
  }
  changeCompany(company){
    this.employeeServiceService.setCompanyId(company.id)
    this.employeeServiceService.setCompanyName(company.name)
    this.name = company.name
  }
  onNewAppointment($event) {
    this.appointment = $event
  }
  

}
