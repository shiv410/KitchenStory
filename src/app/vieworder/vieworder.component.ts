import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent {


  userId: number;
  orders: any[] = [];
  p: string | number | undefined;


  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('userId')!; // + is to convert string to number
    this.loadUserOrders(this.userId);
  }

  loadUserOrders(userId: number) {
    this.orderService.getOrdersByUserId(userId).subscribe(data => {
      this.orders = data;
      console.log(data)
    });
  }

}
