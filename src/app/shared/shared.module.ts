import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
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
  declarations: [SharedComponent, CalendarComponent, TabsComponent, TabComponent]
})
export class SharedModule { }
