import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FoodService } from '../food.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fooditems',
  templateUrl: './fooditems.component.html',
  styleUrls: ['./fooditems.component.css']
})
export class FooditemsComponent {

  foodItems: any[] = [];
  p: string | number | undefined;

  // searchQuery: string = "";
  filteredFoodItems: any[] = [];
  searchTerm: string = '';

  constructor(
    public authService: AuthService,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.foodService.getAllFoodItems().subscribe(data => {
      this.foodItems = data;
      this.filteredFoodItems = data;  // Initialize with all items
    });
  }

  addToCart(foodItem: any) {
    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      alert("Login First!");
      this.router.navigate(["/login"]);
    }

    this.cartService.addToCart(userId, foodItem).subscribe(response => {
      console.log('Added to cart:', response);
      alert(`${foodItem.name} added to cart`);
    });
  }

  search(): void {
    if (this.searchTerm) {
      this.filteredFoodItems = this.foodItems.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredFoodItems = this.foodItems;  // Reset to all items when search term is cleared
    }
  }

}