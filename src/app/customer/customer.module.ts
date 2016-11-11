import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'
import { CustomerComponent } from './customer.component';
import { SearchCompaniesComponent } from './search-companies/search-companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';
import { CustomerService } from './customer.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CustomerComponent
  ],
  declarations: [
    CustomerComponent, 
    SearchCompaniesComponent, 
    CompanyDetailComponent, 
    AppointmentCalendarComponent
  ],
  providers: [CustomerService]
})
export class CustomerModule { }
