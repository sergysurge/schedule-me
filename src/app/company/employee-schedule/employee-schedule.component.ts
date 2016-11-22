import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Response } from "@angular/http";
import * as moment from 'moment';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-employee-schedule',
  templateUrl: './employee-schedule.component.html',
  styleUrls: ['./employee-schedule.component.css']
})
export class EmployeeScheduleComponent {
  companyId = localStorage.getItem('companyId') || 1;
  private employees
  private start
  private startTimes
  private endTimes
  private date

  blockConst(start, end) {
    let cur
    let block = []
    let startTime = start.split(':')
    let label;
    let hour = startTime[0]
    let minutes = startTime[1]
    let minInc = ['00','15','30','45']
    let count = minInc.indexOf(minutes)
    let check = false;


    while(!check){
      if(count>3){
        hour++
        count = 0
      }
      let time= `${hour}:${minInc[count]}`
      if(hour>11){
        if(hour>12){
          if(hour>21){
            label = hour-12
          }else{
            label= `0${hour-12}`
          }
        }else{
          label = hour
        }
        block.push({label: `${label}:${minInc[count]} PM` , value:time})
        if(moment(time,'h:mma').isSame(moment(end,'h:mma'))){
          check = true
        }
      }else{
        label = hour
        block.push({label: `${label}:${minInc[count]} AM` , value:time})
        if(moment(time,'h:mma').isSame(moment(end,'h:mma'))){
          check = true
        }
      }
      count++
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
  setEmployee(id, userCompanyId, nameFirst, nameLast, admin) {
    console.log(id)
    this.step2GotEmployee = true
    this.selectedEmployeeId = {
      id: id,
      userCompanyId: userCompanyId,
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
      userCompanyId: '',
      nameFirst: '',
      nameLast: '',
      admin: ''
  }
  selectedDay
  // UserCompanyId = 1
  postOneSched() {
    let blockCreated = this.blockConst(this.employeeScheduleForm.value.startTime, this.employeeScheduleForm.value.endTime)
    let blockStrinified = JSON.stringify(blockCreated)

    console.log('blockStrinified',blockStrinified)
    console.log('employee',this.employeeScheduleForm)
    this.companyService.postOneEmployeeSched({
      startTime : this.employeeScheduleForm.value.date + ' ' +  this.employeeScheduleForm.value.startTime,
      endTime : this.employeeScheduleForm.value.date + ' ' + this.employeeScheduleForm.value.endTime,
      description : this.employeeScheduleForm.value.description,
      UserCompanyId : this.selectedEmployeeId.userCompanyId,
      block: blockStrinified
    })
    .subscribe( 
      (result) => {console.log(result)}
    )
  }
  employeeScheduleForm : FormGroup

  constructor(private companyService: CompanyService, private formBuilder: FormBuilder) {
    this.companyService.navigateProfilePageOnRefresh()
    this.companyService.adminCheck()
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


}
