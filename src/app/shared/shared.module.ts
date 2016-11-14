import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab.component';
import { CompanyFilterPipe } from './company.pipe'
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CalendarComponent,
    TabsComponent,
    TabComponent,
    CompanyFilterPipe
  ],
  declarations: [
    CalendarComponent, 
    TabsComponent, 
    TabComponent,
    CompanyFilterPipe
  ]
})
export class SharedModule { }
