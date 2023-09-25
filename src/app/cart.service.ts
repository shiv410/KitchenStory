import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, forkJoin, of, switchMap } from 'rxjs';
import { CartItem } from './cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseURL: string = 'http://localhost:3000';

  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable();

  constructor(private http: HttpClient) { }


  addToCart(userId: number, foodItem: any) {
    const cartItem: CartItem = {
      userId,
      foodItemId: foodItem.id,
      quantity: 1,
      price: foodItem.price,
      foodItemName: foodItem.name,
      id: 0
    };
    return this.http.post<CartItem>(`${this.baseURL}/cart`, cartItem);
  }


  updateCartItemCount(userId: number) {
    this.getCartItems(userId).subscribe(items => {
      this.cartItemCount.next(items.length);
    });
  }

  updateCartCount(count: number) {
    this.cartItemCount.next(count);
  }


  getCartItems(userId: number) {
    return this.http.get<CartItem[]>(`${this.baseURL}/cart?userId=${userId}`);
  }

  increaseQuantity(cartItemId: number, quantity: number) {
    return this.http.patch<CartItem>(`${this.baseURL}/cart/${cartItemId}`, { quantity: quantity + 1 });
  }

  decreaseQuantity(cartItemId: number, quantity: number) {
    if (quantity > 1) {
      return this.http.patch<CartItem>(`${this.baseURL}/cart/${cartItemId}`, { quantity: quantity - 1 });
    } else {
      return this.removeCartItem(cartItemId);
    }
  }

  removeCartItem(cartItemId: number) {
    return this.http.delete<CartItem>(`${this.baseURL}/cart/${cartItemId}`);
  }


  clearCart(userId: number) {
    return this.getCartItems(userId).pipe(
      switchMap(items => {
        const removalObservables = items.map(item => this.removeCartItem(item.id));
        return forkJoin(removalObservables);
      })
    );
  }


  placeOrder(userId: number) {
    // First, fetch cart items
    return this.getCartItems(userId).pipe(
      switchMap(cartItems => {
        const order = {
          userId: userId,
          items: cartItems,
          totalAmount: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          date: new Date().toISOString()
        };

        // Add the order
        return this.http.post(`${this.baseURL}/orders`, order);
      }),
      // switchMap(() => {
      //   // Clear the cart after placing the order
      //   return this.clearCart(userId);
      // })
    );
  }


  getUserOrders(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/orders?userId=${userId}`);
  }

}
