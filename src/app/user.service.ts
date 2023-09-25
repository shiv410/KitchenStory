import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient) { }

  private apiurl = "http://localhost:3000/users";

  AddNewUser(user: any): Observable<object> {
    return this.httpclient.post(this.apiurl, user);
  }

  ViewAllUsers(): Observable<any> {
    return this.httpclient.get(this.apiurl);
  }

  DeleteUserById(userId: any): Observable<any> {
    return this.httpclient.delete(`${this.apiurl}/${userId}`)
  }

  getUserByEmail(email: string): Observable<any> {
    return this.httpclient.get(`${this.apiurl}?email=${email}`);
  }

  getUserById(userId: number): Observable<any> {
    return this.httpclient.get<any>(`${this.apiurl}/${userId}`);
  }


}
