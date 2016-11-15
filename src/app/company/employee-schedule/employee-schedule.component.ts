import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Response } from "@angular/http";
import * as moment from 'moment'

import { CompanyService } from '../company.service';

@Component({
  selector: 'app-employee-schedule',
  templateUrl: './employee-schedule.component.html',
  styleUrls: ['./employee-schedule.component.css']
})
export class EmployeeScheduleComponent implements OnInit {
  companyId = localStorage.getItem('companyId') || 1;
  private employees
  private start
  private startTimes
  private endTimes
  private date
  
  blockConst(start, end) {
    let minInc = ['15','30','45','00','15','30','45','00']
    let startNum = Number(start.slice(0,2))
    let startNum12 = Number(start.slice(0,2))
    let startNumLast = Number(start.slice(3))
    let startNumString = startNumLast => {
      if (startNumLast === 0) {
        return '00'
      } else {
        return startNumLast.toString()
      }
    }
    let startIndex = minInc.indexOf(startNumString(startNumLast))
    let endNum = Number(end.slice(0,2))
    let endNumLast = Number(end.slice(3))
    let totalHours = endNum - startNum
    let dayTime = 'AM'
    let block = []
    let first00 = () => {
        if (startNumLast === 0) {
        startNum12--
        startNum--
        } 
      }
    first00()  
    for(let i = 0; i < totalHours; i++) {
      for(let j = startIndex; j < startIndex + 4; j++) {
        if (minInc[j] === '00') {
            startNum12++
            startNum++ 
        }
        if (startNum > 11 ) {
          dayTime = 'PM'
        }
        if (startNum12 > 12) {
        startNum12 = startNum12 - 12
       } 
        block.push({
          label: startNum12 + ':' + minInc[j] + ' ' + dayTime,
          value: startNum + ':' + minInc[j]
        })
      }
    }
    return block
  }

  checkings(){
    console.log(this.start, 'this is start')
    console.log(this.startTimes, 'start times')
    console.log(this.endTimes, 'this is endtimes')
  }
  days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
  step1GotDay = false
  setDay(index) {
    console.log(this.days[index])
    this.step1GotDay = true
    this.selectedDay = index
  }
  step2GotEmployee = false
  setEmployee(id, nameFirst, nameLast, admin) {
    console.log(id)
    this.step2GotEmployee = true
    this.selectedEmployeeId = {
      id: id,
      nameFirst: nameFirst,
      nameLast: nameLast,
      admin: admin
      }
  }

  startTime
  endTime
  description
  selectedEmployeeId: {
      id: '',
      nameFirst: '',
      nameLast: '',
      admin: ''
      }
  selectedDay
  UserCompanyId = 1
  postOneSched() {console.log({
      startTime : this.employeeScheduleForm.value.date + ' ' +  this.employeeScheduleForm.value.startTime,
      endTime : this.employeeScheduleForm.value.date + ' ' + this.employeeScheduleForm.value.endTime,
      description : this.employeeScheduleForm.value.description,
      UserCompanyId : this.selectedEmployeeId.id,
      block: this.blockConst(this.employeeScheduleForm.value.startTime, this.employeeScheduleForm.value.endTime)
  })
    let blockCreated = this.blockConst(this.employeeScheduleForm.value.startTime, this.employeeScheduleForm.value.endTime)
    let blockStrinified = JSON.stringify(blockCreated)

    console.log(typeof blockStrinified)
    this.companyService.postOneEmployeeSched({
      startTime : this.employeeScheduleForm.value.date + ' ' +  this.employeeScheduleForm.value.startTime,
      endTime : this.employeeScheduleForm.value.date + ' ' + this.employeeScheduleForm.value.endTime,
      description : this.employeeScheduleForm.value.description,
      UserCompanyId : this.selectedEmployeeId.id,
      block: blockStrinified
    })
    .subscribe(result => console.log(result))
  }
  employeeScheduleForm : FormGroup

  constructor(private companyService: CompanyService, private formBuilder: FormBuilder) { 
    this.companyService.getEmployees(this.companyId)
    .subscribe(data => {
      this.employees = data
    })

    this.employeeScheduleForm = formBuilder.group({
      'date' : [this.date, Validators.required],
      'startTime' : [this.startTime, Validators.required],
      'endTime' : [this.endTime, Validators.required],
      'description' : [this.description],
      'employeeId' : [this.selectedEmployeeId],
      'selectedDay' : [this.selectedDay]
    })
    }
  ngOnInit() {
    
  }

}
