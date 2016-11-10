import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerAppointmentsComponent } from './customer-appointments/customer-appointments.component';
import { SearchCompaniesComponent } from './search-companies/search-companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CustomerComponent
  ],
  declarations: [CustomerComponent, CustomerAppointmentsComponent, SearchCompaniesComponent, CompanyDetailComponent]
})
export class CustomerModule { }
