import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CalendarComponent
  ],
  declarations: [SharedComponent, CalendarComponent]
})
export class SharedModule { }
