import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-gard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular5-data-table';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path : '', component : HomeComponent },
      { path : 'login', component : LoginComponent },
      { path : 'products', component : ProductsComponent },
      { path : 'shopping-cart', component : ShoppingCartComponent },      
      
      { path : 'check-out', component : CheckOutComponent, canActivate : [AuthGuard] },
      { path : 'order-success', component : OrderSuccessComponent, canActivate : [AuthGuard] },
      { path : 'my/orders', component : MyOrdersComponent, canActivate : [AuthGuard] },

      { path : 'admin/products/:id', component : ProductFormComponent, canActivate : [AuthGuard, AdminAuthGuard] },
      { path : 'admin/prodcuts/new', component : ProductFormComponent, canActivate : [AuthGuard, AdminAuthGuard] },
      { path : 'admin/prodcuts', component : AdminProductsComponent, canActivate : [AuthGuard, AdminAuthGuard] },

      { path : 'admin/orders', component : AdminOrdersComponent, canActivate : [AuthGuard, AdminAuthGuard] },
      
    ])
  ],
  providers: [AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
