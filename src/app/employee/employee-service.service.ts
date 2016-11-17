import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/Rx'
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/forkJoin';

@Injectable()
export class EmployeeServiceService {

  constructor(private http: Http) { }
  // getAppointment(id:Number): Observable<any> {
  //   return this.http.get(`/api/appointments/5`)
  //     .map((response: Response) => response)
  //     // .catch((error))
  //     // .toPromise()
  //     // .then(response => console.log(response))
  //     // .map(response => {
  //     //   console.log(response)
  //     // })
  // }

  //chris MAYBE USE 
  // available: any = []

  // setAvailable(body: Object) {
  //   this.available = body
  //   console.log('Whats up',this.available)
  // }
  
  makeAppointment(body: Object): Promise<any> {
    return this.http.post('/api/appointments', body)
      .toPromise()
      .then(response => response.json())
  }

  getEmployees(id: Number): Observable<any> {
    return this.http.get(`api/users/getemployees/${id}`)
      .map((response: Response) => response)
  }

  getSchedule(body: any): Promise<any>{
    let id = JSON.stringify(body)
    return this.http.get(`/api/schedules/?userCompanyIds=${id}`)
    .toPromise()
    .then(response => response.json())
  }


  getEmployeeCalendarData(userId, userCompanyIds): Observable<any> {

    const employeeAppointmentsUrl = `/api/appointments/${userId}`

    let token = localStorage.getItem('jwt-token');
    let authHeader = `Bearer ${token}`
    let headers = new Headers({ 'authorization': authHeader })

    let params: URLSearchParams = new URLSearchParams()
    params.set('userCompanyIds', JSON.stringify(userCompanyIds))
    
    let optionsForSchedules = new RequestOptions({ 
      headers: headers,
      search: params
    })
    let optionsForAppointments = new RequestOptions({
      headers: headers
    })
    
    return Observable.forkJoin(
      this.http.get('/api/schedules/', optionsForSchedules)
        .map((response: Response) => {
          return response.json()
        })
        .catch(this.handleError),
      this.http.get(`/api/appointments/${userId}`, optionsForAppointments)
        .map((response: Response) => {
          return response.json()
        })
        .catch(this.handleError)
    )
  }
  
  handleError(err: Response) {
    return Observable.throw(err.json() || 'Server error')
  }

}
