import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyButtonComponent } from './components/my-button/my-button.component';
import { MyTableComponent } from './components/my-table/my-table.component';
import { CarService } from './services/car.service';
import { HttpClientModule } from '@angular/common/http';
import { CarDetailsComponent } from './components/car-details/car-details.component'
import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TableParentComponent } from './components/table-parent/table-parent.component';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG
} from '@okta/okta-angular'

import { OktaAuth } from '@okta/okta-auth-js'

import myAppConfig from './config/my-app-config';

const oktaConfig = myAppConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [

  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},

  {path: 'cars/:id', component: CarDetailsComponent},
  {path: 'cars', component: TableParentComponent},
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
    TableParentComponent,
    LoginComponent,
    LoginStatusComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OktaAuthModule

  ],
  providers: [CarService, { provide: OKTA_CONFIG, useValue: {oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
