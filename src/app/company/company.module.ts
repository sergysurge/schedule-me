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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    CompanyRoutingModule
  ],
  declarations: [
    CompanyComponent,
    AddEmployeeComponent,
    EmployeeScheduleComponent,
    OptionsComponent,
    ProfileComponent
  ],
  exports: [
    CompanyComponent,
    ProfileComponent
  ],
  providers: [CompanyService]
})
export class CompanyModule { }
