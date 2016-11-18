import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Response } from "@angular/http";

import { CompanyService } from '../company.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  //asyncString = this.companyService.getUsersFromCompany(1)

  admin = ['true', 'false']
  addEmployee = {
    userId: '1',
    companyId: '1',
    isAdmin: 'true'
  }
  userId
  companyId
  addEmployeeForm : FormGroup
  deleteEmployeeForm : FormGroup
  userSearch = 'poopie face'
  userNotFound = false
  userShow = false
  userFetched = {
    id: '',
    email: '',
    lastName: '',
    firstName: ''
  }
  searchUser(name) {
    console.log(name)
    this.companyService.getUsers(name)
      .subscribe(data => {
        console.log(data, 'data we got back from user')
        console.log(data.response, 'good?')
        if (!data.response.success) {
          this.userNotFound = true
          this.userShow = false
        } else if (data.response.success) {
          this.userNotFound = false
          this.userShow = true
        }
        this.userFetched.id = data.response.user.id
        this.userFetched.email = data.response.user.email
        this.userFetched.lastName = data.response.user.lastName
        this.userFetched.firstName = data.response.user.firstName
      })
  }

  onSubmit() {
    this.companyService.addEmployee({
      userId : this.addEmployeeForm.value.userId,
      companyId : this.addEmployeeForm.value.companyId,
      isAdmin : this.addEmployeeForm.value.isAdmin
    })
    .subscribe(data => {
      console.log(data, 'dis da data')
      //this.asyncString = this.companyService.getUsersFromCompany(1)
    })
    console.log(this.addEmployee)
  }

  deleteEmployeeSubmit() {
    this.companyService.deleteEmployee({
      userId: this.deleteEmployeeForm.value.userId, 
      companyId: this.deleteEmployeeForm.value.companyId
    })
    .subscribe(data => {
      console.log(data)
      // this.asyncString = this.companyService.getUsersFromCompany(1)
    })
  }
  asynctrial
  companyIds = localStorage.getItem('companyId') || 1
  constructor(private companyService: CompanyService, private formBuilder: FormBuilder) {
    this.companyService.navigateProfilePageOnRefresh()
    this.companyService.adminCheck()

    this.asynctrial = this.companyService.getEmployees(this.companyIds)

    this.addEmployeeForm = formBuilder.group({
      'userId' : [this.addEmployee.userId, Validators.required],
      'companyId' : [this.addEmployee.companyId, Validators.required],
      'isAdmin' : [this.addEmployee.isAdmin]
    })
    this.deleteEmployeeForm = formBuilder.group({
      'userId' : [this.userId, Validators.required],
      'companyId' : [this.companyId, Validators.required]
    })
  }

  ngOnInit() {
  }

  // constructor(companyService: CompanyService) {
  //   companyService.addEmployee({userId: this.userId, companyId: this.companyId, isAdmin: this.isAdmin})
  //     .subscribe(
  //       employee => console.log(employee)
  //       //this.employee = employee.json()
  //     )
  //  }

  // ngOnInit() {
  // }
  employee;
}

