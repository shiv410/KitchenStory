import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';
import { AddfooditemComponent } from './addfooditem/addfooditem.component';
import { ViewallfooditemsComponent } from './viewallfooditems/viewallfooditems.component';
import { FooditemsComponent } from './fooditems/fooditems.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';


import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { VieworderComponent } from './vieworder/vieworder.component';
import { FooterComponent } from './footer/footer.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    AdminhomeComponent,
    ViewAllUsersComponent,
    AddfooditemComponent,
    ViewallfooditemsComponent,
    FooditemsComponent,
    CartComponent,
    PaymentComponent,
    VieworderComponent,
    FooterComponent,
    ChangepasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    // Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
