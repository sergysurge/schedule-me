import { Injectable, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class CompanyService {

  /* COMPANY PROFILE COMPONENT */
  company: any = {
    id: localStorage.getItem('localCompanyId')
  }
  
  getCompanyById(companyId) {
    return this.http.get('api/companies/getonecompany/' + companyId)
    .map((response: Response) => {
      let data = response.json()
      console.log(data, '***IS THIS WHERE THE ERROR IS')
      //console.log(data.BrandName.name, 'SHOULD NOT BE HERE')
      this.company.BrandNameId = data.BrandNameId || null;
      this.company.brandName = data.BrandName.name
      this.company.address = data.address || null;
      this.company.createdAt = data.createdAt || null;
      this.company.description = data.description || null;
      this.company.id = data.id || null;
      this.company.image = data.image || null;
      this.company.logo = data.logo || null;
      this.company.name = data.name || null;
      this.company.phoneNumber = data.phoneNumber || null;
      this.company.updatedAt = data.updatedAt || null;
      this.company.website = data.website || null;
      console.log(this.company, 'COMPANYSERVICE = POPULATED COMPANY')
      return response.json()
    })
  }

  brandNamesAll: any = [];

  getAllBrandNames() {
    return this.http.get('api/companies/getallbrandnames')
    .map((response:Response) => {
      let brandNamesReturned = response.json()
      brandNamesReturned.forEach((data) => {
      let brandName = {
        id: data.id,
        name: data.name,
        companyId: data.companyId
      }
      this.brandNamesAll.push(brandName)
      })
      console.log(this.brandNamesAll, 'after being populated')
      return response.json()
      })
  }

  updateProfile(body) {
    return this.http.put('api/companies/updatecompany', body)
  }
  /* COMPANY PROFILE COMPONENT END */
  
  /* AUTH, CHECKING ADMIN FROM */
  adminSuccessLink() {
    let ans = false
    let associations = JSON.parse(localStorage.getItem('userAssociations'))
    // console.log(associations, 'these are the user associations in company.service', typeof associations)
    associations.forEach(item => {
      if (this.company.id === item.companyId) {
        ans = item.admin
      }
    })
    if (window.location.pathname === ("/admin/company/" + this.company.id)) {
      ans = false
    }
    return ans
  }
  adminCheck() {
    let associations = JSON.parse(localStorage.getItem('userAssociations')) || [{id: 1, admin: false}]
    // console.log(associations, 'these are the user associations in company.service', typeof associations)
    let isAdmin = false;
    associations.forEach(item => {
      if (Number(this.company.id) === Number(item.companyId)) {
        isAdmin = item.admin
      }
    })
    if (isAdmin === false) {
      this.router.navigate(['users/search/', localStorage.getItem('localCompanyId')])
    }
  }
  navigateAdminPage() {
    this.router.navigate(['admin/company/', this.company.id])
  }

  navigateProfilePageOnRefresh() {
    if (window.location.pathname.indexOf("employees") 
    || window.location.pathname.indexOf("schedules") || window.location.pathname.indexOf("options")) {
      if (!!this.company.name === false) {
        this.router.navigate(['/users/search/', this.company.id])
      }
    }
  }

  profileUpdate = false

  profileUpdateControl() {
    let path = window.location.pathname.slice(1,6)
    console.log(path, 'this is the path')
    if (path === 'admin') {
      this.profileUpdate = true
    } else {
      this.profileUpdate = false
    }
  }
   /* AUTH, CHECKING ADMIN FROM END */

  /* API ADD EMPLOYEES */
  employees: any = []

  getEmployees(companyId) {
    return this.http.get('/api/users/getemployees/' + companyId)
    .map((response:Response) => {
      console.log(response, 'dis **** response');
      this.employees = []
      let allEmployees = response.json()[0].users
      allEmployees.forEach( data => {
        let employee = {
        id: data.id,
        name : data.firstName + ' ' + data.lastName,
        image : data.image || 'DEFAULT',
        email : data.email,
        phoneNumber: data.phoneNumber,
        empSince: data.UserCompany.createdAt,
        admin: data.UserCompany.admin
      }
      this.employees.push(employee)
      })
      return allEmployees
    })
  }

  postOneEmployeeSched(employeeSched) {
    return this.http.post('/api/schedules/oneschedule', employeeSched)
      .map((response: Response) => response.json())
  }

  getUsersFromCompany(companyId) {
    return this.http.get('/api/users/employees?companyId=' + companyId)
    .map((response: Response) => response.json().response.employees)
  }

  deleteEmployee(body) {
    return this.http.delete('api/users/employees?userId=' + body.userId + '&' + 'companyId=' + body.companyId)
    .map((response:Response) => response)
  }

  addEmployee(body: any): Observable<any> {
    // const headers = new Headers('Content-Type', 'Application/json');
    return this.http.put('/api/users/employees', body)
    .map((response:Response) => response)
    //.catch(err => return err)
  }

  /*  COMPANY MODEL */
  //GOOD
  getUsers(input) {
    if (1 + input > 1) {
      return this.http.get('api/users/?userId=' + input + '&email=')
      .map((response: Response) => response.json())
    } else if (typeof input === 'string') {
      return this.http.get('api/users/?userId=&email=' + input)
      .map((response:Response) => response.json())
    }
  }
  //getAllBrandNames

  postBrandName(body) {
    return this.http.post('/api/companies/postbrandname', body)
    .map((response:Response) => {
      //this.getAllBrandNames()
      return response.json()
    })
  }  
  //options
  addOptions (body:any): Observable<any>{
    return this.http.post('api/companies/postoneoption',body)
    .map((response:Response) => response)
  }

  getOptions (body:any): Observable<any>{
    return this.http.get('api/companies/getalloptions/'+body)
    .map((response:Response) => response.json())
  }
  
  constructor(private http: Http, private router: Router) { }

}
