import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerService {

  constructor(private http: Http, private requestOptions: RequestOptions) { }
  
  user: any
  companyEmployees: any
  companySchedules: any
  companyAppointments: any
  companyId: any
  company: any
  private token = localStorage.getItem('jwt-token');
  private authHeader = `Bearer ${this.token}`
  private headers = new Headers({ 'authorization': this.authHeader })
  private options = new RequestOptions({ headers: this.headers })
  private userSubject: Subject<any> = new Subject<any>()
  private employeesSubject: Subject<any> = new Subject<any>()
  private subject: Subject<number> = new Subject<number>()


  getCustomerAppointments(userId): Observable<any> {
    return this.http.get(`/api/appointments/customer/${userId}`, this.options)
      .map((response: Response) => {
        return response.json()
      })
      .catch(this.handleError)
  }
  
  getCompanyById(companyId) {
    return this.http.get(`/api/companies/getonecompany/${companyId}`, this.options)
      .map((response: Response) => {
        this.company = response.json() 
        return this.company
      })
      .catch(this.handleError)
  }

  getCompanies() {
    return this.http.get('/api/companies/getallcompanies', this.options)
      .map((response: Response) => { return response.json() })
      .catch(this.handleError)
  }

  getEmployees() {
    return this.employeesSubject.asObservable()
  }

  setEmployees(employees) {
    this.companyEmployees = employees
    this.employeesSubject.next(this.companyEmployees)
  }

  getUser() {
    return this.userSubject.asObservable()
  }

  setUser(user) {
    this.user = user
    this.userSubject.next(this.user)
  }

  getUserInformation(userId, email) {
    let params: URLSearchParams = new URLSearchParams()
    userId && params.set('userId', userId)
    email && params.set('email', email)

    let userOptions = new RequestOptions({ 
      headers: this.headers,
      search: params 
    })

    return this.http.get('/api/users/', userOptions)
      .map((response: Response) => {
        if(response.json().response.success){
          this.setUser(response.json().response.user)
        }
        return response.json()
      })
      .catch(this.handleError)
  }

  submitUserUpdates(userId, updatedValues) {
    this.setUser(updatedValues)
    return this.http.put(`/api/users/${userId}/update`, updatedValues, this.options)
      .map((response: Response) => response.json())
      .catch(this.handleError)
  }

  getCompanySchedulesAndAppointments(companyId): Observable<any> {
    return Observable.forkJoin(
      this.http.get(`/api/appointments/company/${companyId}`, this.options)
        .map((response: Response) => {
          this.companyAppointments = response.json().response.appointments
          return this.companyAppointments
        }),

      this.http.get(`/api/users/employees/${companyId}`, this.options)
        .map((response: Response) => {
          let parsed = response.json().response
          if (!parsed.success) return []
          this.setEmployees(parsed.employees)
          return this.companyEmployees
            .map((employee) => employee.UserCompany.id)
        })
        .flatMap((userCompanyIds) => {
          let userCompanyIdsString = JSON.stringify(userCompanyIds)
          return this.http.get(`api/schedules/?userCompanyIds=${userCompanyIdsString}`, this.options)
            .map((response: Response) => {
              this.companySchedules = response.json()
              return this.companySchedules
            })
        })
    )
  }

  handleError(err: Response) {
    return Observable.throw(err.json() || 'Server error')
  }

  getCompanyId() {
    return this.subject.asObservable()
  }
  setCompanyId(companyId: number) {
    this.companyId = companyId
    this.subject.next(this.companyId)
  }
}
