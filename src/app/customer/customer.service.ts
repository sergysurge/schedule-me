import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerService {

  constructor(private http: Http) { }
  getCustomerAppointments(customerId:number): Observable<any> {
    return this.http.get(`/api/appointments/customer/${customerId}`)
      .map((response: Response) => response.json())
      // .catch((err) => {Observable.throw(err.json().error)})
      
  }
}
