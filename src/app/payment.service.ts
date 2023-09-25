import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // mockPayment(amount: number): Observable<string> {
  //   // Always approve after a 2-second delay
  //   return of('Approved').pipe(delay(2000));
  // }


  private baseURL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  placeOrder(orderDetails: any) {
    return this.http.post(`${this.baseURL}/orders`, orderDetails);
  }

  paymentProcess(paymentDetails: any) {
    // This is just a demo payment gateway.
    console.log('Processing payment with details:', paymentDetails);

    return this.http.post(`${this.baseURL}/payments`, paymentDetails);

    // return of({ status: 'success' });
  }

}
