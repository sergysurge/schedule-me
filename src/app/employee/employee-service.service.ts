import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeServiceService {

  constructor(private http: Http) { }
  getAppointment(): Observable<any> {
    return this.http.get('/api/appointments/2')
      .map((response: Response) => response)
      // .catch((error))
      // .toPromise()
      // .then(response => console.log(response))
      // .map(response => {
      //   console.log(response)
      // })
  }
}
