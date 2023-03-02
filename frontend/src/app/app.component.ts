import { Component } from '@angular/core';
import { MyButtonConfig } from './components/my-button/config/my-button-config';
import { MyTableActions } from './components/my-table/config/actions/my-table-actions';
import { MyHeaders } from './components/my-table/config/header/my-headers';
import { MyTableConfig } from './components/my-table/config/my-table-config';
import { MyOrder } from './components/my-table/config/order/my-order';
import { MyPagination } from './components/my-table/config/pagination/my-pagination';
import { MySearch } from './components/my-table/config/search/my-search';
import { MyTableComponent } from './components/my-table/my-table.component';
import { AuthService } from './services/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'frontend';

  constructor(public loginService: AuthService) {}

  signUpButton: MyButtonConfig = new MyButtonConfig(
    'signup-button',
    'Sign Up',
    ''
  );

  signInButton: MyButtonConfig = new MyButtonConfig(
    'login-button',
    'Login',
    ''
  );

  signOutButton: MyButtonConfig = new MyButtonConfig(
    'login-button',
    'Logout',
    ''
  );





}
