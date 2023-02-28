import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyButtonComponent } from './components/my-button/my-button.component';
import { MyTableComponent } from './components/my-table/my-table.component';
import { CarService } from './services/car/car.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';
import { Routes, RouterModule, Router} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CarTableComponent } from './components/car/car-table/car-table.component';
import { LoginComponent } from './components/login/login.component';

import { RentalDetailsComponent } from './components/rental/rental-details/rental-details.component';
import { RentalService } from './services/rental/rental.service';
import { CustomerService } from './services/customer/customer.service';
import { RoleService } from './services/role/role.service';
import { RentalTableComponent } from './components/rental/rental-table/rental-table.component';
import { CustomerDetailsComponent } from './components/customer/customer-details/customer-details.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CarCreateComponent } from './components/car/car-create/car-create.component';
import { RentalCreateComponent } from './components/rental/rental-create/rental-create.component';
import { CarEditComponent } from './components/car/car-edit/car-edit.component';
import { RentalEditComponent } from './components/rental/rental-edit/rental-edit.component';
import { CustomerTableComponent } from './components/customer/customer-table/customer-table.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { AuthService } from './services/authentication/auth.service';
import { AuthGuard } from './services/authentication/authguard';
import { LogoutComponent } from './components/logout/logout.component';
import { BasicAuthHttpInterceptorService } from './services/authentication/basic-auth-http-interceptor.service';


const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'profile', component: CustomerDetailsComponent},
  {path: 'rental/create', component: RentalCreateComponent },
  {path: 'rental/edit/:id', component: RentalEditComponent },
  {path: 'rental/:id', component: RentalDetailsComponent},
  {path: 'cars/rent/:idCar/:idCustomer', component: RentalCreateComponent },
  {path: 'cars/create', component: CarCreateComponent, },
  {path: 'cars/edit/:id', component: CarEditComponent, },
  {path: 'cars/:id', component: CarDetailsComponent},
  {path: 'customers/create', component: CustomerCreateComponent },
  {path: 'customers/edit/:id', component: CustomerEditComponent },
  {path: 'customers/:id', component: CustomerDetailsComponent},
  {path: 'customers', component: CustomerTableComponent, canActivate:[AuthGuard]},
  {path: 'rentals', component: RentalTableComponent, canActivate:[AuthGuard]},
  {path: 'cars', component: CarTableComponent, canActivate:[AuthGuard]},
  {path: '', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    MyButtonComponent,
    MyTableComponent,
    CarDetailsComponent,
    HomeComponent,
    PageNotFoundComponent,
    CarTableComponent,
    LoginComponent,
    RentalDetailsComponent,
    RentalTableComponent,
    CustomerDetailsComponent,
    FilterPipe,
    CarCreateComponent,
    RentalCreateComponent,
    CarEditComponent,
    RentalEditComponent,
    CustomerTableComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    LogoutComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  exports: [RouterModule],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:BasicAuthHttpInterceptorService, multi:true
    },
    CarService, RentalService, CustomerService, RoleService, AuthService, AuthGuard],
  //[CarService, RentalService, CustomerService, RoleService, AuthService, AuthGuard],

  bootstrap: [AppComponent]
})
export class AppModule { }
