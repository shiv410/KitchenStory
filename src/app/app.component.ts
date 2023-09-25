import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KitchenStory';

  constructor(
    public authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) { }

  cartItemCount: number;
  userName: string;


  ngOnInit() {
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });

    const userId = this.authService.getCurrentUserId();
    this.cartService.updateCartItemCount(userId);

    this.authService.getUserDetails(userId).subscribe(user => {
      this.userName = user.username;
      console.log(user);
    });
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }


}
