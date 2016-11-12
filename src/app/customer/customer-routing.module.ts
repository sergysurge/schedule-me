import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component'
import { SearchCompaniesComponent } from './search-companies/search-companies.component'
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component'
import { CustomerComponent } from './customer.component'
import { MyAccountComponent } from './my-account/my-account.component'

const routes: Routes = [
    { 
        path: 'users', 
        component: CustomerComponent,
        children: [
            { path: 'account', component: MyAccountComponent },
            { path: 'appointments', component: AppointmentCalendarComponent },
            { path: 'search', component: SearchCompaniesComponent }
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

