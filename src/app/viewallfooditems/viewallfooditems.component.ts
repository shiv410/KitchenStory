import { Component } from '@angular/core';
import { FoodService } from '../food.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viewallfooditems',
  templateUrl: './viewallfooditems.component.html',
  styleUrls: ['./viewallfooditems.component.css']
})
export class ViewallfooditemsComponent {

  foodItems: any[] = [];
  p: number;

  constructor(private foodService: FoodService, private router: Router) { }

  ngOnInit(): void {
    this.foodService.getAllFoodItems().subscribe(data => {
      this.foodItems = data;
    });
  }


  deleteFoodItem(foodItem: any): void {
    if (confirm(`Are you sure you want to delete food item: ${foodItem.name}?`)) {
      this.foodService.deleteFoodItem(foodItem.id).subscribe(() => {
        this.foodItems = this.foodItems.filter(f => f !== foodItem);  // Remove the food item from the array
        this.router.navigate(["/viewallfooditems"]);
      });
    }
  }

}
