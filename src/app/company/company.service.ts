import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyService {

  constructor(private http: Http) { }
  addEmployee(body): Observable<any> {
    return this.http.put('/api/users/employees', body)
    .map((res:Response) => res)
    //.catch(err => return err)
  }
}
