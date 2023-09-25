import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiurl = 'http://localhost:3000/foodItems'; // Adjust the URL based on your backend setup.

  constructor(private httpclient: HttpClient) { }

  addFoodItem(foodItem: any): Observable<any> {
    return this.httpclient.post(this.apiurl, foodItem);
  }

  getAllFoodItems(): Observable<any> {
    return this.httpclient.get(this.apiurl);
  }

  deleteFoodItem(foodItemId: number): Observable<any> {
    return this.httpclient.delete(`${this.apiurl}/${foodItemId}`);
  }


  searchFoodItems(query: string): Observable<any> {
    return this.httpclient.get(`${this.apiurl}?name_like=${query}`);
  }

}
