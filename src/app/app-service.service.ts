import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppServiceService {

  constructor(private http: Http) { }
  getCompanies(): Observable<any> {
    return this.http.get('/api/companies/getallcompanies/')
      .map((response: Response) => response)
      // .catch((error))
      // .toPromise()
      // .then(response => console.log(response))
      // .map(response => {
      //   console.log(response)
      // })
  }

  
}
