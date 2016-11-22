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
 
  constructor(private employeeServiceService:EmployeeServiceService,private authService: AuthService) { 
    this.user = this.authService.getUserAssociations()
    this.id = localStorage.getItem('userId');
  }
  ngOnInit() {
    this.employeeServiceService.getUserCompanies(this.id)
      .then(companies =>{
        this.companies = companies
        this.employeeServiceService.setCompanyId(this.companies[0].id)
        console.log('this companies',this.companies)
      })

  }
  changeCompany(company){
    this.employeeServiceService.setCompanyId(company.id)
  }
  onNewAppointment($event) {
    this.appointment = $event
  }
  

}
