import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppServiceService } from './app-service.service';
import { EmployeeServiceService } from './employee/employee-service.service'

import { EmployeeModule } from './employee/employee.module';
import { ScheduleModule , DropdownModule , CalendarModule} from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EmployeeModule,
    ScheduleModule,
    DropdownModule
  ],
  providers: [AppServiceService, EmployeeServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
