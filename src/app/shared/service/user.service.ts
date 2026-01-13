import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const DUMMY_HTTP ='https://dummyjson.com';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  //  HÀM GỌI API LOGIN
  login(username: string, password: string): Observable<any> {
    console.log('CALL API LOGIN', username, password);
    return this.http.post(DUMMY_HTTP + '/auth/login', {
      username: username,
      password: password
    });
  }

  //HÀM GỌI API REGIGTER
  register(username: string, password: string): Observable<any> {
    console.log('CALL API REGISTER', username, password);
    return this.http.post(DUMMY_HTTP + '/users/add', {
      username: username,
      password: password
    });
  }
  
}
