import { Component, OnInit } from '@angular/core';
import { CompanyService } from './company.service';
import { AccordionModule } from 'primeng/primeng';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {
  userId = '1';
  companyId = '1';
  isAdmin = 'true';

  constructor(companyService: CompanyService) {
    // companyService.addEmployee({userId: this.userId, companyId: this.companyId, isAdmin: this.isAdmin})
    //   .subscribe(
    //     employee => console.log(employee)
    //     //this.employee = employee.json()
    //   )
   }

  ngOnInit() {
  }
  employee;
}
