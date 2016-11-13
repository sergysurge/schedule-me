import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

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
              localStorage.setItem('userAssociations', parsed.associations)
            }
            return response.json()
        })

  }

  signin() {

  }

  signout() {
    
  }

}
