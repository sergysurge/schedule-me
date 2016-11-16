import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Rx';
// import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerService {

  constructor(private http: Http, private requestOptions: RequestOptions) { }
  user: any
  private subject: Subject<any> = new Subject<any>()

  getCustomerAppointments(userId): Observable<any> {
    let token = localStorage.getItem('jwt-token');
    let authHeader = `Bearer ${token}`
    let headers = new Headers({ 'authorization': authHeader })
    let options = new RequestOptions({ headers: headers })

    return this.http.get(`/api/appointments/customer/${userId}`, options)
      .map((response: Response) => {
        return response.json()
      })
      .catch(this.handleError)
  }
  
  getCompanyById(companyId) {
    let token = localStorage.getItem('jwt-token');
    let authHeader = `Bearer ${token}`
    let headers = new Headers({ 'authorization': authHeader })
    let options = new RequestOptions({ headers: headers })

    return this.http.get(`/api/companies/getonecompany/${companyId}`)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }

  getCompanies() {
    let token = localStorage.getItem('jwt-token');
    let authHeader = `Bearer ${token}`
    let headers = new Headers({ 'authorization': authHeader })
    let options = new RequestOptions({ headers: headers })

    return this.http.get('/api/companies/getallcompanies')
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }

  getUserInformation(userId, email) {
    let token = localStorage.getItem('jwt-token');
    let authHeader = `Bearer ${token}`
    let headers = new Headers({ 'authorization': authHeader })

    let params: URLSearchParams = new URLSearchParams()
    userId && params.set('userId', userId)
    email && params.set('email', email)

    let options = new RequestOptions({ 
      headers: headers,
      search: params 
    })

    return this.http.get('/api/users/', options)
      .map((response: Response) => {
        console.log('64', response)
        if(response.json().response.success){
          console.log('service', response.json())
          this.user = response.json().response.user
        }
        return response.json()
      })
      .catch(this.handleError)
  }

  submitUserUpdates(userId, updatedValues) {
    this.setUser(updatedValues)
    let token = localStorage.getItem('jwt-token');
    let authHeader = `Bearer ${token}`
    let headers = new Headers({ 'authorization': authHeader })

    let options = new RequestOptions({
      headers: headers,
      body: updatedValues
    })
    return this.http.put(`/api/users/${userId}/update`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }

  getUser() {
    return this.subject.asObservable()
  }
  setUser(user) {
    this.user = user
    this.subject.next(this.user)
  }
  // getCompanyData(companyId)

  handleError(err: Response) {
    return Observable.throw(err.json() || 'Server error')
  }
}
