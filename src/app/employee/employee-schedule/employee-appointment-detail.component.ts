import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service'

@Component({
  selector: 'app-employee-appointment-detail',
  templateUrl: './employee-appointment-detail.component.html',
  styles: [`
  h1{
    margin-top: 0px;
  }
  `]
})
export class EmployeeAppointmentDetailComponent implements OnInit {
  @Input() selectedEvent: any
  @Input() eventType: string
  companyName: any;
  id : any;

  constructor(private employeeService: EmployeeServiceService) {
    this.id = localStorage.getItem('userId'); 
    employeeService.getCompanyName()
      .subscribe(
        companyName => {
          this.companyName = companyName
        }
      )
  }

  ngOnInit() {
    this.employeeService.getUserCompanies(this.id)
      .then(companies =>{
        this.companyName = companies[0].name
      })
    }
  }
