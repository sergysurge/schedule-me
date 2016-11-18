import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CompanyComponent } from './company.component'
import { ProfileComponent } from './profile/profile.component'
import { AddEmployeeComponent } from './add-employee/add-employee.component'
import { EmployeeScheduleComponent } from './employee-schedule/employee-schedule.component'
import { OptionsComponent } from './options/options.component'

const routes: Routes = [
    { 
        path: 'company/:id',
        component: ProfileComponent,
        //canActivateChild: [AuthGuard],
        
    },
    { 
      path: 'admin/company/:id',
      component: CompanyComponent,
      children: [
        {
          path: '',
          component: ProfileComponent
        },
        { 
            path: 'employees', 
            component: AddEmployeeComponent,
            //canDeactivate: [EditAccountGuard]
        },
        { 
            path: 'schedules', 
            component: EmployeeScheduleComponent,
            //canDeactivate: [EditAccountGuard]
        }
        ,
        { 
            path: 'options', 
            component: OptionsComponent,
            //canDeactivate: [EditAccountGuard]
        }
      ]
  }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class CompanyRoutingModule { }

