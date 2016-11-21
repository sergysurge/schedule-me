import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompanyService } from './company.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeScheduleComponent } from './employee-schedule/employee-schedule.component';
import { OptionsComponent } from './options/options.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarModule } from 'primeng/primeng';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyCalendarComponent } from './employee-schedule/company-calendar/company-calendar.component';
import { CustomerModule } from '../customer/customer.module'
import { CustomerService } from '../customer/customer.service'
import { SharedModule } from '../shared/shared.module';
import { SelectCompanyEmployeesComponent } from './employee-schedule/company-calendar/select-company-employees.component';
import { CalendarEventDetailComponent } from './employee-schedule/company-calendar/calendar-event-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    CompanyRoutingModule,
    CustomerModule,
    SharedModule
  ],
  declarations: [
    CompanyComponent,
    AddEmployeeComponent,
    EmployeeScheduleComponent,
    OptionsComponent,
    ProfileComponent,
    CompanyCalendarComponent,
    SelectCompanyEmployeesComponent,
    CalendarEventDetailComponent
  ],
  exports: [
    CompanyComponent,
    ProfileComponent
  ],
  providers: [CompanyService, CustomerService]
})
export class CompanyModule { }
