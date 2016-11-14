import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { TabsComponent } from './tabs.component';
import { TabComponent } from './tab.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CalendarComponent,
    TabsComponent,
    TabComponent
  ],
  declarations: [
    CalendarComponent, 
    TabsComponent, 
    TabComponent
  ]
})
export class SharedModule { }
