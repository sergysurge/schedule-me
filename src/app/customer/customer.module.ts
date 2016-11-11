import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { SearchCompaniesComponent } from './search-companies/search-companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';
import { ScheduleModule } from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CustomerComponent
  ],
  declarations: [CustomerComponent, SearchCompaniesComponent, CompanyDetailComponent, AppointmentCalendarComponent]
})
export class CustomerModule { }
