import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component'
import { SearchCompaniesComponent } from './search-companies/search-companies.component'
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component'
import { CustomerComponent } from './customer.component'
import { MyAccountComponent } from './my-account/my-account.component'
import { EditAccountComponent } from './my-account/edit-account.component'
import { AuthGuard } from '../auth/auth-guard.service'
import { EditAccountGuard } from './my-account/edit-account-guard.service'

const routes: Routes = [
    { 
        path: 'users', 
        component: CustomerComponent,
        canActivateChild: [AuthGuard],
        children: [
            { path: '', redirectTo: 'appointments', pathMatch: 'full' },
            { path: 'account', component: MyAccountComponent },
            { path: 'appointments', component: AppointmentCalendarComponent },
            { path: 'search', component: SearchCompaniesComponent },
            { path: 'search/:companyId', component: MakeAppointmentComponent }
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

export class CustomerRoutingModule { }

