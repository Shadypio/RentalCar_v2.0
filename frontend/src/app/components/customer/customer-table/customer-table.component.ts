import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/common/customer/customer';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { MyTableActions } from '../../my-table/config/actions/my-table-actions';
import { MyHeaders } from '../../my-table/config/header/my-headers';
import { MyTableConfig } from '../../my-table/config/my-table-config';
import { MyOrder } from '../../my-table/config/order/my-order';
import { MyPagination } from '../../my-table/config/pagination/my-pagination';
import { MySearch } from '../../my-table/config/search/my-search';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css'],
})
export class CustomerTableComponent implements OnInit, OnDestroy {

  listCustomerSubscription: any

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private _router: Router
  ) {}

  idHeader: MyHeaders;
  firstNameHeader: MyHeaders;
  lastNameHeader: MyHeaders;
  usernameHeader: MyHeaders;
  dateOfBirthHeader: MyHeaders;
  enabledHeader: MyHeaders;
  roleHeader: MyHeaders;
  rentalMadeHeader: MyHeaders;
  myHeaders: MyHeaders[];

  orderByID: MyOrder;
  searchByUsername: MySearch;
  pagination: MyPagination;
  customerTable: MyTableConfig;

  customers: Customer[] = [];

  ngOnInit(): void {
    // creating headers for table
    this.idHeader = new MyHeaders('id', 'ID');
    this.firstNameHeader = new MyHeaders('firstName', 'First Name');
    this.lastNameHeader = new MyHeaders('lastName', 'Last Name');
    this.usernameHeader = new MyHeaders('username', 'Username');
    this.dateOfBirthHeader = new MyHeaders('dateOfBirth', 'Date Of Birth');
    this.enabledHeader = new MyHeaders('enabled', 'Enabled');
    this.roleHeader = new MyHeaders('role[roleName]', 'Role');
    this.rentalMadeHeader = new MyHeaders('rentalMade', 'Rental Made');
    this.myHeaders = [
      // this.idHeader,
      this.firstNameHeader,
      this.lastNameHeader,
      this.usernameHeader,
      this.dateOfBirthHeader,

      //this.enabledHeader,
      //this.roleHeader,
      //this.rentalMadeHeader,
    ];

    // declaring order criteria
    this.orderByID = new MyOrder('0', 'asc');

    // declaring search option
    this.searchByUsername = new MySearch(['username']);

    // declaring MyPagination object
    this.pagination = new MyPagination(5, [5, 10, 15, 20]);

    // declaring table for displaying data cars
    this.customerTable = new MyTableConfig(
      this.myHeaders,
      this.orderByID,
      this.searchByUsername,
      this.pagination,
      [MyTableActions.NEW_ROW, MyTableActions.EDIT, MyTableActions.DELETE]
    );

    this.listCustomers();
  }

  listCustomers() {
    this.listCustomerSubscription = this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  newRowHandler($event: { dataItem: any; action: any }) {
    this._router.navigateByUrl(`customers/create`);
  }

  performActionOnDataHandler(event: { dataItem: any; action: string }) {

    if (event.action === 'Edit') {
      this._router.navigateByUrl(`customers/edit/${event.dataItem.id}`);
    } else if (event.action === 'Delete') {
      this.customerService
        .deleteCustomer(event.dataItem.id)
        .subscribe((response) => {
          this.listCustomers();
        });
    }
  }

  viewDetailsOnDataHandler(event: { dataItem: any }) {
    // view details of selected row
    this._router.navigateByUrl(`customers/${event.dataItem.id}`);
  }

  ngOnDestroy(): void {
    this.listCustomerSubscription.unsubscribe();
  }
}
