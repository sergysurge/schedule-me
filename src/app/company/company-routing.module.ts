import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CompanyComponent } from './company.component'
import { ProfileComponent } from './profile/profile.component'
import { AddEmployeeComponent } from './add-employee/add-employee.component'
import { EmployeeScheduleComponent } from './employee-schedule/employee-schedule.component'
import { OptionsComponent } from './options/options.component'

const routes: Routes = [
    { 
      path: 'admin',
      children: [
        {
          path: '',
          component: CompanyComponent
        },
        {
          path: 'company/:id',
          component: CompanyComponent,
          children: [
            { 
            path: '', 
            component: ProfileComponent,
            //canDeactivate: [EditAccountGuard]
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

