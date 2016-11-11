import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompanyService } from './company.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeScheduleComponent } from './employee-schedule/employee-schedule.component';
import { OptionsComponent } from './options/options.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CompanyComponent,
    AddEmployeeComponent,
    EmployeeScheduleComponent,
    OptionsComponent
  ],
  exports: [
    CompanyComponent
  ],
  providers: [CompanyService]
})
export class CompanyModule { }
