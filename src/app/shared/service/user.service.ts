import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const DUMMY_HTTP = 'https://dummyjson.com';
const AUTH_LOGIN = '/auth/login';
const USERS_ADD = '/users/add';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //  HÀM GỌI API LOGIN
  login(username: string, password: string): Observable<any> {
    return this.http.post(DUMMY_HTTP + AUTH_LOGIN, {
      username: username,
      password: password
    });
  }

  //HÀM GỌI API REGIGTER
  register(username: string, password: string): Observable<any> {
    return this.http.post(DUMMY_HTTP + USERS_ADD, {
      username: username,
      password: password
    });
  }

}
