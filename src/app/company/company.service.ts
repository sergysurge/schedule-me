import { Injectable, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class CompanyService {

  private companiesLanding = []
  private token = localStorage.getItem('jwt-token');
  private authHeader = `Bearer ${this.token}`
  private headers = new Headers({ 'authorization': this.authHeader })
  private options = new RequestOptions({headers: this.headers})
  /* COMPANY-LANDING COMPONENT */

  // PROFILE COMPONENT NGIF VARIABLES
  
  getAllCompaniesByUserId(userId) {
    return this.http.get('api/companies/usercompanies/' + userId, this.options)
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
    return this.http.get('api/companies/getonecompany/' + companyId, this.options)
    .map((response: Response) => {
      let data = response.json()
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
      return response.json()
    })
  }

  brandNamesAll: any = [];

  getAllBrandNames() {
    return this.http.get('api/companies/getallbrandnames', this.options)
    .map((response:Response) => {
      this.brandNamesAll = []
      let brandNamesReturned = response.json()
      brandNamesReturned.forEach((data) => {
      let brandName = {
        id: data.id,
        name: data.name
      }
      this.brandNamesAll.push(brandName)
      })
      return response.json()
      })
  }
  //need when creating a company account to auto
  //log in the current user to company
  getOneBrandNameAddCompany(brandId) {
    return this.http.get('api/companies/getbrandname/' + brandId, this.options)
    .map((response:Response) => {
      let brandCompanies = response.json().companies
      brandCompanies.forEach(item=> {
        if (this.company.name === item.name) {
          this.company = item
        }
      })
      return brandCompanies
    })
  }

  updateProfile(body) {
    return this.http.put('api/companies/updatecompany', body, this.options)
  }

  postProfile(body) {
    return this.http.post('api/companies/postcompany', body, this.options)
  }
  /* COMPANY PROFILE COMPONENT END */
  
  /* AUTH, CHECKING ADMIN FROM */
  adminSuccessLink() {
    let ans = false
    let associations = JSON.parse(localStorage.getItem('userAssociations'))
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
    return this.http.get('/api/users/getemployees/' + companyId, this.options)
    .map((response:Response) => {
      this.employees = []
      let allEmployees = response.json()[0].users
      allEmployees.forEach( data => {
        let employee = {
        id: data.id,
        name : data.firstName + ' ' + data.lastName,
        image : data.image || 'http://www.clker.com/cliparts/B/R/Y/m/P/e/blank-profile-md.png',
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
    return this.http.post('/api/schedules/oneschedule', employeeSched, this.options)
      .map((response: Response) => response.json())
  }

  getUsersFromCompany(companyId) {
    return this.http.get('/api/users/employees?companyId=' + companyId, this.options)
    .map((response: Response) => response.json().response.employees)
  }

  deleteEmployee(body) {
    return this.http.delete('api/users/employees?userId=' + body.userId + '&' + 'companyId=' + body.companyId, this.options)
    .map((response:Response) => response)
  }

  addEmployee(body: any): Observable<any> {
    return this.http.put('/api/users/employees', body, this.options)
    .map((response:Response) => response)
  }

  /*  COMPANY MODEL */
  getUsers(input) {
    if (1 + input > 1) {
      return this.http.get('api/users/?userId=' + input + '&email=', this.options)
      .map((response: Response) => response.json())
    } else if (typeof input === 'string') {
      return this.http.get('api/users/?userId=&email=' + input, this.options)
      .map((response:Response) => response.json())
    }
  }
  //getAllBrandNames

  postBrandName(body) {
    return this.http.post('/api/companies/postbrandname', body, this.options)
    .map((response:Response) => {
      return response.json()
    })
  }  
  //options
  addOptions (body:any): Observable<any>{
    return this.http.post('api/companies/postoneoption', body, this.options)
    .map((response:Response) => response.json())
  }

  allOptions = []
  
  getOptions (body:any): Observable<any>{
    return this.http.get('api/companies/getalloptions/' + body, this.options)
    .map((response:Response) => {
      this.allOptions = response.json()
      return response.json()
    })
  }
  
  constructor(private http: Http, private router: Router, requestOptions: RequestOptions) { }

}
