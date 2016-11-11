import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Response } from "@angular/http";

import { CompanyService } from '../company.service';

@Component({
  selector: 'app-employee-schedule',
  templateUrl: './employee-schedule.component.html',
  styleUrls: ['./employee-schedule.component.css']
})
export class EmployeeScheduleComponent implements OnInit {
  companyId = 1
  employees = this.companyService.getEmployees(1)
  getEmployeesSubmit(companyId) {
    this.companyService.getEmployees(companyId)
  }

  days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
  step1GotDay = false
  setDay(index) {
    console.log(this.days[index])
    this.step1GotDay = true
    this.selectedDay = index
  }
  step2GotEmployee = false
  setEmployee(id) {
    console.log(id)
    this.step2GotEmployee = true
    this.selectedEmployeeId = id
  }

  startTime
  endTime
  comment
  selectedEmployeeId
  selectedDay
  UserCompanyId = 1
  postOneSched() {console.log({startTime : this.employeeScheduleForm.value.startTime,
      endTime : this.employeeScheduleForm.value.endTime,
      comment : this.employeeScheduleForm.value.comment,
      UserCompanyId : this.selectedEmployeeId,})
    this.companyService.postOneEmployeeSched({
      startTime : this.employeeScheduleForm.value.startTime,
      endTime : this.employeeScheduleForm.value.endTime,
      comment : this.employeeScheduleForm.value.comment,
      UserCompanyId : this.selectedEmployeeId,
    })
    .subscribe(result => console.log(result))
  }
  employeeScheduleForm : FormGroup

  constructor(private companyService: CompanyService, private formBuilder: FormBuilder) { 
    this.employeeScheduleForm = formBuilder.group({
      'startTime' : [this.startTime, Validators.required],
      'endTime' : [this.endTime, Validators.required],
      'comment' : [this.comment, Validators.required],
      'employeeId' : [this.selectedEmployeeId],
      'selectedDay' : [this.selectedDay]
    })
    }
  ngOnInit() {
  }

}
