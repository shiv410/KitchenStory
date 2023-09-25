import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { PaymentService } from '../payment.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  totalAmount: number = 0;
  cartItems: never[];
  addressForm: FormGroup;

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.addressForm = this.fb.group({
      fullName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Get the total amount from query parameters
    this.totalAmount = +this.route.snapshot.queryParamMap.get('total')!;
  }


  confirmPayment() {
    const userId = this.authService.getCurrentUserId();

    if (this.addressForm.valid) {
      const paymentDetails = {
        userId: userId,
        amount: this.totalAmount,
        address: this.addressForm.value
        // method: 'demo'
      };

      this.paymentService.paymentProcess(paymentDetails).subscribe(response => {
        if (response) {
          alert('Payment successful!');
          console.log(response);
          this.router.navigate(["/menu"]);

          // Clear the cart
          this.cartService.clearCart(userId).subscribe(() => {
            // alert('Cart cleared after successful payment.');
          });
        } else {
          alert('Payment failed. Please try again.');
        }
      });
    } else {
      alert('Please fill in all address details.');
    }
  }


}
