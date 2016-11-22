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
 /* USER SEARCH */
  userNotFound = false
  userShow = false
  userFetched = {
    id: '',
    email: 'JohnSmith@schedule-me.com',
    name: 'John Smith',
    image: 'http://www.clker.com/cliparts/B/R/Y/m/P/e/blank-profile-md.png',
    phoneNumber: '818-111-1111'
  }
  userSearch
  
  searchUser(name) {
    console.log(name, 'this is name')
    this.companyService.getUsers(name)
      .subscribe(data => {
        if (!data.response.success) {
          this.userNotFound = true
          this.userShow = false
        } else if (data.response.success) {
          this.userNotFound = false
          this.userShow = true
        }
        console.log(data, 'data from search user')
        this.userFetched.id = data.response.user.id
        this.userFetched.email = data.response.user.email
        this.userFetched.name = data.response.user.firstName + data.response.user.lastName
        this.userFetched.image = data.response.user.image || "//www.clker.com/cliparts/B/R/Y/m/P/e/blank-profile-md.png",
        this.userFetched.phoneNumber = data.response.user.phoneNumber
      })
  }
  /* USER SEARCH END */
  
  admin = ['true', 'false']
  addEmployee = {
    userId: '1',
    companyId: '1',
    isAdmin: 'true'
  }
  userId
  companyId

  
  addEmployeeAdmin
  onSubmit() {
    console.log(this.addEmployeeAdmin, 'we should be passed a boolean here')
    this.companyService.addEmployee({
      userId : this.userFetched.id,
      companyId : localStorage.getItem('localCompanyId'),
      isAdmin : this.addEmployeeAdmin
    })
    .subscribe(data => {
      console.log(data, 'dis da data')
      if (data.status === 200) {
      this.companyService.getEmployees(localStorage.getItem('localCompanyId'))
      .subscribe(data => console.log(data, 'after submitting'))
      //this.asyncString = this.companyService.getUsersFromCompany(1)
      this.userFetched = {
        id: '',
        email: 'JohnSmith@schedule-me.com',
        name: 'John Smith',
        image: 'http://www.clker.com/cliparts/B/R/Y/m/P/e/blank-profile-md.png',
        phoneNumber: '818-111-1111'
      }
      this.userSearch = ''
      this.userShow = false
      } else {
        alert("please make sure all forms are filled")
      }
    })
    console.log(this.addEmployee)
  }


  // SELECT AND DELETE AN EMPLOYEE

  consolelog(ds) {
    console.log(ds)
  }

  deleteEmployeeSubmit(id, name) {
    let confDelete =  confirm(`Are you sure you would like to delete ${name}`)
    if (confDelete === false) {
      return
    } else {
    this.companyService.deleteEmployee({
      userId: id, 
      companyId: localStorage.getItem('localCompanyId')
    })
    .subscribe(data => {
      console.log(data)
      this.companyService.getEmployees(localStorage.getItem('localCompanyId'))
      .subscribe(data => console.log(data, 'after submitting'))
      // this.asyncString = this.companyService.getUsersFromCompany(1)
    })
    }
  }
  showAdminControl = false;
  updateAdminSubmit(add) {
    if (this.showAdminControl === true) {
      if (add) {
        console.log(add, 'FINISH THIS, YOU SHOULD UPDATE THE USERs')
        console.log('CHECKED, everything works, just need to send request to update')
      }
    }
    this.showAdminControl === false ? this.showAdminControl = true : this.showAdminControl = false;
    console.log(this.showAdminControl, 'admin control')
  }
 
  companyIds = localStorage.getItem('companyId') || 1


  addEmployeeForm : FormGroup
  deleteEmployeeForm : FormGroup


  constructor(private companyService: CompanyService, private formBuilder: FormBuilder) {
    /* DO NOT TOUCH, AUTH AND REDIRECT */
    this.companyService.navigateProfilePageOnRefresh()
    this.companyService.adminCheck()
    /* DO NOT TOUCH, AUTH AND REDIRECT END */


    /* CONTROLLER get employees */
    this.companyService.getEmployees(localStorage.getItem('localCompanyId')).subscribe()
    /* CONTROLLER get employees END */


    /* FORM add employee */
    this.addEmployeeForm = formBuilder.group({
      'userId' : [this.addEmployee.userId, Validators.required],
      'companyId' : [this.addEmployee.companyId, Validators.required],
      'isAdmin' : [this.addEmployee.isAdmin]
    })
     /* FORM add employee END */

    this.deleteEmployeeForm = formBuilder.group({
      'userId' : [this.userId, Validators.required],
      'companyId' : [this.companyId, Validators.required]
    })
  }

  ngOnInit() {
  }
}

