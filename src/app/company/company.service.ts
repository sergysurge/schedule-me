import { Injectable, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class CompanyService {

  private companiesLanding = []
  /* COMPANY-LANDING COMPONENT */

  // PROFILE COMPONENT NGIF VARIABLES
  
  private token = localStorage.getItem('jwt-token');
  private authHeader = `Bearer ${this.token}`
  private headers = new Headers({ 'authorization': this.authHeader })
  private userSubject: Subject<any> = new Subject<any>()
  private employeesSubject: Subject<any> = new Subject<any>()


  getAllCompaniesByUserId(userId) {
     let options = new RequestOptions({ headers: this.headers })

    return this.http.get('api/companies/usercompanies/' + userId, options)
    .map((response: Response) => {
      this.companiesLanding = [];
      let comps = response.json()
      comps.forEach(data => {
      if (data.UserCompany.admin === true) {
        this.companiesLanding.push({
         BrandNameId : data.BrandNameId || null,
         address : data.address || null,
         createdAt : data.createdAt || null,
         description : data.description || null,
         id : data.id || null,
         image : data.image || null,
         logo : data.logo || null,
         name : data.name || null,
         phoneNumber : data.phoneNumber || null,
         updatedAt : data.updatedAt || null,
         website : data.website || null
        })
      }
      })
      console.log(this.companiesLanding, 'resulting companies, check to see if admin is good')
      return response.json()
    })
  }

  /* COMPANY-LANDING END */



  /* COMPANY PROFILE COMPONENT */
  company: any = {
    id: localStorage.getItem('localCompanyId') || null,
    BrandNameId :null,
    address : null,
    description :  null,
    image :   null,
    logo :  null,
    name :  null,
    phoneNumber :  null,
    website :  null,
  }
  
  getCompanyById(companyId) {
    let options = new RequestOptions({ headers: this.headers })

    return this.http.get('api/companies/getonecompany/' + companyId, options)
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
    let options = new RequestOptions({ headers: this.headers })
    return this.http.get('api/companies/getallbrandnames', options)
    .map((response:Response) => {
      let brandNamesReturned = response.json()
      brandNamesReturned.forEach((data) => {
      let brandName = {
        id: data.id,
        name: data.name
      }
      this.brandNamesAll.push(brandName)
      })
      console.log(this.brandNamesAll, 'after being populated')
      return response.json()
      })
  }
  //need when creating a company account to auto
  //log in the current user to company
  getOneBrandNameAddCompany(brandId) {
    let options = new RequestOptions({ headers: this.headers })
    return this.http.get('api/companies/getbrandname/' + brandId, options)
    .map((response:Response) => {
      let brandCompanies = response.json().companies
      brandCompanies.forEach(item=> {
        if (this.company.name === item.name) {
          this.company = item
          console.log(this.company, 'end result after getting one brand name')
        }
      })
      return brandCompanies
    })
  }

  updateProfile(body) {
    let options = new RequestOptions({
      headers: this.headers,
      body: body
    })
    return this.http.put('api/companies/updatecompany', options)
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
        this.router.navigate(['/admin'])
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
    let options = new RequestOptions({ headers: this.headers })
    return this.http.get('/api/users/getemployees/' + companyId, options)
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
    let options = new RequestOptions({
      headers: this.headers,
      body: employeeSched
    })
    
    return this.http.post('/api/schedules/oneschedule', options)
      .map((response: Response) => response.json())
  }

  getUsersFromCompany(companyId) {
    let options = new RequestOptions({
      headers: this.headers
    })
    return this.http.get('/api/users/employees?companyId=' + companyId, options)
    .map((response: Response) => response.json().response.employees)
  }

  deleteEmployee(body) {
    let options = new RequestOptions({
      headers: this.headers
    })
    return this.http.delete('api/users/employees?userId=' + body.userId + '&' + 'companyId=' + body.companyId, options)
    .map((response:Response) => response)
  }

  addEmployee(body: any): Observable<any> {
    let options = new RequestOptions({
      headers: this.headers,
      body: body
    })
    
    // const headers = new Headers('Content-Type', 'Application/json');
    return this.http.put('/api/users/employees', options)
    .map((response:Response) => response)
    //.catch(err => return err)
  }

  /*  COMPANY MODEL */
  //GOOD
  getUsers(input) {
    let options = new RequestOptions({
      headers: this.headers
    })
    if (1 + input > 1) {
      return this.http.get('api/users/?userId=' + input + '&email=', options)
      .map((response: Response) => response.json())
    } else if (typeof input === 'string') {
      return this.http.get('api/users/?userId=&email=' + input, options)
      .map((response:Response) => response.json())
    }
  }
  //getAllBrandNames

  postBrandName(body) {
    let options = new RequestOptions({
      headers: this.headers,
      body: body
    })
    return this.http.post('/api/companies/postbrandname', options)
    .map((response:Response) => {
      //this.getAllBrandNames()
      return response.json()
    })
  }  
  //options
  addOptions (body:any): Observable<any>{
    let options = new RequestOptions({
      headers: this.headers,
      body: body
    })
    return this.http.post('api/companies/postoneoption',options)
    .map((response:Response) => response.json())
  }

  allOptions = []
  
  getOptions (body:any): Observable<any>{
    let options = new RequestOptions({
      headers: this.headers
    })
    return this.http.get('api/companies/getalloptions/'+body, options)
    .map((response:Response) => {
      this.allOptions = response.json()
      return response.json()
    })
  }
  
  constructor(private http: Http, private router: Router, private requestOptions: RequestOptions) { 
    
  }

}
