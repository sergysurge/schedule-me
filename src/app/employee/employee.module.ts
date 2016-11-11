import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee.component';
import { EmployeeScheduleComponent } from './employee-schedule/employee-schedule.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeAppointmentsComponent } from './employee-appointments/employee-appointments.component';
import { DropdownModule, CalendarModule} from 'primeng/primeng';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    EmployeeComponent,
    EmployeeScheduleComponent,
    EmployeeFormComponent,
    EmployeeAppointmentsComponent
  ],
  declarations: [EmployeeComponent, EmployeeScheduleComponent, EmployeeFormComponent, EmployeeAppointmentsComponent]
})
export class EmployeeModule { 

}
