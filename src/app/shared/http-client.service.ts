// import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http'

// @Injectable()
// export class HttpClientService {
  
//   constructor(private http: Http, private headers: Headers) { }
  
//   addAuthorizationHeader(headers: Headers) {
//     let token = localStorage.getItem('jwt-token');
//     if (token) {
//       let authHeader = `Bearer ${token}`
//       headers.append('authorization', authHeader)
//     }
//   }

//   get(url: string) {
//     let headers = new Headers()
//     this.addAuthorizationHeader(headers)
//     return this.http.get(url, options)
//   }

// }
