import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router'

@Injectable()
export class AuthService {

  constructor(private http: Http, private router: Router) { }

  submitUserData(user) {
      let headers = new Headers()
      headers.append('Content-Type', 'application/json')
      let options = new RequestOptions({ headers: headers })

      return this.http.post('/api/users/signup', JSON.stringify({ user: user }), options)
        .map((response: Response) => {
            let parsed = response.json()
            if (parsed.response.success) {
              localStorage.setItem('userId', parsed.response.userId)
              localStorage.setItem('jwt-token', parsed.token)
            }
            return parsed
        })

  }

  signin(user) {

    let headers = new Headers()
    let encodedCredentials = btoa(`${user.email}:${user.password}`)
    headers.append('authorization', encodedCredentials)
    let options = new RequestOptions({ headers: headers })

    return this.http.get('api/users/signin', options)
      .map((response: Response) => {
        let parsed = response.json()
        if (parsed.response.success) {
          localStorage.setItem('userId', parsed.response.userId)
          localStorage.setItem('jwt-token', parsed.token)
          localStorage.setItem('userAssociations', JSON.stringify(parsed.response.associations))
        }
        return parsed
      })
  }

  signout() {
    localStorage.removeItem('jwt-token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userAssociations')
    this.router.navigate([''])
  }

}
