import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodService } from '../food.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addfooditem',
  templateUrl: './addfooditem.component.html',
  styleUrls: ['./addfooditem.component.css']
})
export class AddfooditemComponent {

  foodItemForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private foodService: FoodService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.foodItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.foodItemForm.valid) {
      const foodItem = this.foodItemForm.value;

      this.foodService.addFoodItem(foodItem).subscribe(response => {
        alert('Food item added successfully!');
        this.foodItemForm.reset(); // Reset the form
        // this.router.navigate(["/viewallfooditems"]);
      }, error => {
        this.errorMessage = 'Error while adding food item. Please try again.';
      });
    }
  }

}
