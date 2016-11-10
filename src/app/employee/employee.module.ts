import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { EmployeeScheduleComponent } from './employee-schedule/employee-schedule.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeAppointmentsComponent } from './employee-appointments/employee-appointments.component';
import { ScheduleModule , DropdownModule, CalendarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    ScheduleModule,
    DropdownModule,
    CalendarModule
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
