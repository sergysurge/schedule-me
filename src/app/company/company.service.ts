import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyService {
  company: any = {}

  constructor(private http: Http) { }
  postOneEmployeeSched(employeeSched) {
    return this.http.post('/api/schedules/oneschedule', employeeSched)
  }

  getEmployees(companyId) {
    return this.http.get('/api/users/getemployees/' + companyId)
    .map((response:Response) => response.json())
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
  getCompanyById(companyId) {
    return this.http.get('api/companies/getonecompany/' + companyId)
    .map((response: Response) => {
      let data = response.json()
      this.company.brandName = data.BrandName.name || null;
      this.company.address = data.address || null;
      this.company.createdAt = data.createdAt || null;
      this.company.updatedAt = data.updatedAt || null;
      this.company.description = data.description || null;
      this.company.id = data.id || null;
      this.company.image = data.image || null;
      this.company.logo = data.logo || null;
      this.company.name = data.name || null;
      this.company.website = data.website || null;
      this.company.phoneNumber = data.phoneNumber || null;
      console.log(this.company, 'COMPANYSERVICE = POPULATED COMPANY')
      return response.json()
    })
  }

  //getAllBrandNames

  

}
