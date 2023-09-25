import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';
import { AuthGuard } from './auth.guard';
import { AddfooditemComponent } from './addfooditem/addfooditem.component';
import { ViewallfooditemsComponent } from './viewallfooditems/viewallfooditems.component';
import { FooditemsComponent } from './fooditems/fooditems.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { VieworderComponent } from './vieworder/vieworder.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'changepass', component: ChangepasswordComponent },
  { path: 'admin', component: AdminhomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'viewalluser', component: ViewAllUsersComponent, canActivate: [AuthGuard] },
  { path: 'addfood', component: AddfooditemComponent },
  { path: 'viewallfooditems', component: ViewallfooditemsComponent },
  { path: 'menu', component: FooditemsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'view/:userId', component: VieworderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
