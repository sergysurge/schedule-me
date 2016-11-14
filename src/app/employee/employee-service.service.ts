import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx'
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/forkJoin';

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

    let token = localStorage.getItem('jwt-token');
    let authHeader = `Bearer ${token}`
    let headers = new Headers({ 'authorization': authHeader })
    let options = new RequestOptions({ headers: headers })
    
    return Observable.forkJoin(
      this.http.get(employeeSchedulesUrl, options)
        .map((response: Response) => response.json())
        .catch(this.handleError),
      this.http.get(employeeAppointmentsUrl)
        .map((response: Response) => response.json())
        .catch(this.handleError)
    )
  }
  
  handleError(err: Response) {
    return Observable.throw(err.json() || 'Server error')
  }

}
