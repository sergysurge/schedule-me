import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CustomerComponent } from './customer/customer.component'
import { EmployeeComponent } from './employee/employee.component'
import { CompanyComponent } from './company/company.component'
import { HomeComponent } from './home.component'

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: CustomerComponent },
    { path: 'work', component: EmployeeComponent },
    { path: 'company', component: CompanyComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
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

