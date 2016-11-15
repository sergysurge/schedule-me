import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { CompanyService } from './company.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeScheduleComponent } from './employee-schedule/employee-schedule.component';
import { OptionsComponent } from './options/options.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarModule} from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  declarations: [
    CompanyComponent,
    AddEmployeeComponent,
    EmployeeScheduleComponent,
    OptionsComponent,
    ProfileComponent
  ],
  exports: [
    CompanyComponent
  ],
  providers: [CompanyService]
})
export class CompanyModule { }
