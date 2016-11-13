import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkjoin';

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

  makeAppointment(body: Object): Promise<any> {
    return this.http.post('/api/appointments', body)
      .toPromise()
      .then(response => response.json())
  }

  getEmployees(id: Number): Observable<any> {
    return this.http.get('api/users/employees/?companyId='+ id)
      .map((response: Response) => response)
  }



  getEmployeeCalendarData(userId, userCompanyId): Observable<any> {
    const employeeSchedulesUrl = `/api/schedules/${userCompanyId}`
    const employeeAppointmentsUrl = `/api/appointments/${userId}`
    
    return Observable.forkJoin(
      this.http.get(employeeSchedulesUrl)
        .map((response: Response) => response.json()),
      this.http.get(employeeAppointmentsUrl)
        .map((response: Response) => response.json())
    )
  }

}
