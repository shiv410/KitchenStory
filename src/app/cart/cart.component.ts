import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartItems: any[] = [];
  totalAmount: number = 0;
  cartItemCount: number = 0;


  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCartItems();
    this.loadCartItemsCount();
    this.cartService.cartItemCount$.subscribe(count => this.cartItemCount = count);
  }

  loadCartItems() {
    const currentUser = this.authService.getCurrentUserId();
    this.cartService.getCartItems(currentUser).subscribe(items => {
      this.cartItems = items;
      this.calculateTotalAmount();
    });
  }


  loadCartItemsCount() {
    const userId = this.authService.getCurrentUserId();
    this.cartService.getCartItems(userId).subscribe(items => {
      this.cartItemCount = items.length;
    });
  }


  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  increaseQuantity(cartItem: any) {
    this.cartService.increaseQuantity(cartItem.id, cartItem.quantity).subscribe(() => {
      cartItem.quantity++; // Update local data
      this.calculateTotalAmount();
    });
  }

  decreaseQuantity(cartItem: any) {
    if (cartItem.quantity > 1) {
      this.cartService.decreaseQuantity(cartItem.id, cartItem.quantity).subscribe(() => {
        cartItem.quantity--; // Update local data
        this.calculateTotalAmount();
      });
    }
  }


  removeItem(item: any) {
    this.cartService.removeCartItem(item.id).subscribe(() => {
      this.loadCartItems(); // Reload items after one is removed
    });
  }

  clearAll() {
    const currentUser = this.authService.getCurrentUserId();
    this.cartService.clearCart(currentUser).subscribe(() => {
      this.cartItems = []; // Clear local cart items
      this.totalAmount = 0; // Reset total amount
      console.log(this.cartItems);
    });
  }


  placeOrder() {
    const userId = this.authService.getCurrentUserId();
    const currentDate = new Date().toISOString();
    const orderDetails = {
      userId: userId,
      cartItems: this.cartItems,
      total: this.totalAmount,
      date: currentDate
    };

    this.cartService.placeOrder(userId).subscribe(response => {
      // Navigate to the payment component
      this.router.navigate(['/payment'], { queryParams: { total: this.totalAmount } });
      // Passing the total amount as a query parameter to the payment component
    });
  }
}

