import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { EmployeeFormComponent } from './employee-form/employee-form.component'
import { EmployeeAppointmentsComponent } from './employee-appointments/employee-appointments.component'
import { EmployeeComponent } from './employee.component'
import { EmployeeScheduleComponent } from './employee-schedule/employee-schedule.component'

const routes: Routes = [
  { path: 'work', component: EmployeeComponent, children: [
    { path: 'schedule',component: EmployeeScheduleComponent },
    { path: 'form' , component: EmployeeFormComponent},
    { path: 'appointments' , component: EmployeeAppointmentsComponent},
    { path: '' , redirectTo: 'schedule', pathMatch: 'full'}
  ]}
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EmployeeRoutingModule { }
