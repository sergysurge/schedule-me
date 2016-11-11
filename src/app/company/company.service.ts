import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyService {

  
  constructor(private http: Http) { }

  getEmployees(companyId) {
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

  //getAllBrandNames

  

}
