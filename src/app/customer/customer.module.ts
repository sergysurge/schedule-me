import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { HttpModule } from '@angular/http';
import { CustomerComponent } from './customer.component';
import { SearchCompaniesComponent } from './search-companies/search-companies.component';
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';
import { CustomerService } from './customer.service';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFormComponent } from './search-companies/search-form.component';
import { EditAccountComponent } from './my-account/edit-account.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  exports: [
    CustomerComponent
  ],
  declarations: [
    CustomerComponent, 
    SearchCompaniesComponent, 
    AppointmentCalendarComponent,
    MakeAppointmentComponent,
    MyAccountComponent,
    SearchFormComponent,
    EditAccountComponent
  ],
  providers: [CustomerService]
})
export class CustomerModule { }
