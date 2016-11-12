import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CustomerComponent } from './customer/customer.component'
import { EmployeeComponent } from './employee/employee.component'
import { CompanyComponent } from './company/company.component'

const routes: Routes = [
    { path: 'users', component: CustomerComponent },
    { path: 'work', component: EmployeeComponent },
    { path: 'company', component: CompanyComponent },
    { path: '**', redirectTo: 'users', pathMatch: 'full' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    // providers: [guardService],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }

