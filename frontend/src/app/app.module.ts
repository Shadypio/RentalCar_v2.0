import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyButtonComponent } from './components/my-button/my-button.component';
import { MyTableComponent } from './components/my-table/my-table.component';
import { CarService } from './services/car/car.service';
import { HttpClientModule } from '@angular/common/http';
import { CarDetailsComponent } from './components/car/car-details/car-details.component';
import { Routes, RouterModule, Router} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CarTableComponent } from './components/car/car-table/car-table.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import {
  OktaAuthGuard,
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG
} from '@okta/okta-angular'

import { OktaAuth } from '@okta/okta-auth-js'

import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
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

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {

  // use injector to access any service available within your application
  const router = injector.get(Router);

  // redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [

  {path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard],
                    data: {onAuthRequired: sendToLoginPage} },

  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: CustomerDetailsComponent},
  {path: 'rental/create', component: RentalCreateComponent},
  {path: 'rental/edit/:id', component: RentalEditComponent},
  {path: 'rental/:id', component: RentalDetailsComponent},
  {path: 'cars/rent/:id', component: RentalCreateComponent},
  {path: 'cars/create', component: CarCreateComponent},
  {path: 'cars/edit/:id', component: CarEditComponent},
  {path: 'cars/:id', component: CarDetailsComponent},
  {path: 'customers/create', component: CustomerCreateComponent},
  {path: 'customers', component: CustomerTableComponent},
  {path: 'rentals', component: RentalTableComponent},
  {path: 'cars', component: CarTableComponent},
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
    LoginStatusComponent,
    MembersPageComponent,
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
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OktaAuthModule

  ],
  exports: [RouterModule],
  providers: [CarService, RentalService, CustomerService, RoleService, { provide: OKTA_CONFIG, useValue: {oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
