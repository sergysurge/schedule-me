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
import { EditAccountGuard } from './my-account/edit-account-guard.service'
import { SelectEmployeeFormComponent } from './make-appointment/select-employee-form.component';
import { ScheduleAppointmentComponent } from './make-appointment/schedule-appointment.component';
import { EmployeeServiceService } from '../employee/employee-service.service'
import { EmployeeModule } from '../employee/employee.module';
import { DropdownModule, CalendarModule} from 'primeng/primeng';
import { PublicCompanyProfileComponent } from './make-appointment/public-company-profile/public-company-profile.component';
import { CustomerAppointmentDetailComponent } from './appointment-calendar/customer-appointment-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeModule,
    DropdownModule,
    CalendarModule
  ],
  exports: [
    CustomerComponent,
    MakeAppointmentComponent
  ],
  declarations: [
    CustomerComponent, 
    SearchCompaniesComponent, 
    AppointmentCalendarComponent,
    MakeAppointmentComponent,
    MyAccountComponent,
    SearchFormComponent,
    EditAccountComponent,
    SelectEmployeeFormComponent,
    ScheduleAppointmentComponent,
    PublicCompanyProfileComponent,
    CustomerAppointmentDetailComponent
  ],
  providers: [CustomerService, EditAccountGuard, EmployeeServiceService]
})
export class CustomerModule { }
