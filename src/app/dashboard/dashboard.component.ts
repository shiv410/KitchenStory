import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userName: string;
  orders: any[] = [];
  showOrders: boolean = false;
  p: number;


  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { }


  ngOnInit() {
    const userId = this.authService.getCurrentUserId();

    this.authService.getUserDetails(userId).subscribe(user => {
      this.userName = user.username;
      console.log(user);
    });

    this.loadUserOrders(userId);

  }


  loadUserOrders(userId: number) {
    this.orderService.getOrdersByUserId(userId).subscribe(data => {
      this.orders = data;
    });
  }

  toggleOrdersDisplay() {
    this.showOrders = !this.showOrders;
    if (this.showOrders && !this.orders.length) {  // Load orders only if not already loaded
      const userId = this.authService.getCurrentUserId();
      this.loadUserOrders(userId);
    }
  }

}
