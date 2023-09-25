import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseURL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // getOrdersByUserId(userId: number): Observable<any> {
  //   return this.http.get(`${this.baseURL}/orders?userId=${userId}`);
  // }

  getOrdersByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseURL}/orders?userId=${userId}`);
  }

}
