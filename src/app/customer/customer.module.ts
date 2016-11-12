import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';

import { CustomerComponent } from './customer.component';
import { SearchCompaniesComponent } from './search-companies/search-companies.component';
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';
import { CustomerService } from './customer.service';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { MyAccountComponent } from './my-account/my-account.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule
  ],
  exports: [
    CustomerComponent
  ],
  declarations: [
    CustomerComponent, 
    SearchCompaniesComponent, 
    AppointmentCalendarComponent,
    MakeAppointmentComponent,
    MyAccountComponent
  ],
  providers: [CustomerService]
})
export class CustomerModule { }
