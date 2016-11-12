import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppServiceService } from './app-service.service';
import { EmployeeServiceService } from './employee/employee-service.service'
import { EmployeeModule } from './employee/employee.module';
// import { ScheduleModule , DropdownModule , CalendarModule} from 'primeng/primeng';
import { CompanyModule } from './company/company.module';

import { CustomerModule } from './customer/customer.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EmployeeModule,
    // ScheduleModule,
    // DropdownModule,
    CompanyModule,
    ReactiveFormsModule,
    CustomerModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [AppServiceService, EmployeeServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
