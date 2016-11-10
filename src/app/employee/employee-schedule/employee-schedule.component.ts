import { Component, OnInit, ElementRef } from '@angular/core';
// import * as jQuery from 'jquery';
declare var jQuery: JQueryStatic;
@Component({
  selector: 'app-employee-schedule',
  templateUrl: './employee-schedule.component.html',
  styleUrls: ['./employee-schedule.component.css']
})
export class EmployeeScheduleComponent implements OnInit {

  constructor(private schedule: ElementRef, private el: ElementRef) { }
  // schedule = ;
  ngOnInit() {
  }
  // ngAfterViewInit() {
  //   this.schedule = jQuery(this.el.nativeElement.children[0]);
  // }

}
