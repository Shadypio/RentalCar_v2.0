import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rental } from 'src/app/common/rental/rental';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import { MyButtonConfig } from '../../my-button/config/my-button-config';
import { MyTableActions } from '../../my-table/config/actions/my-table-actions';
import { MyHeaders } from '../../my-table/config/header/my-headers';
import { MyTableConfig } from '../../my-table/config/my-table-config';
import { MyOrder } from '../../my-table/config/order/my-order';
import { MyPagination } from '../../my-table/config/pagination/my-pagination';
import { MySearch } from '../../my-table/config/search/my-search';

@Component({
  selector: 'app-rental-table',
  templateUrl: './rental-table.component.html',
  styleUrls: ['./rental-table.component.css'],
})
export class RentalTableComponent implements OnInit {
  constructor(
    private rentalService: RentalService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private _router: Router
  ) {}

  // creating buttons
  newRowButton: MyButtonConfig = new MyButtonConfig(
    'newrow-button-class',
    'New Row',
    'fa fa-plus'
  );

  actionButton: MyButtonConfig = new MyButtonConfig(
    'action-button-class',
    '',
    'fa fa-pencil'
  );

  detailsButton: MyButtonConfig = new MyButtonConfig(
    'action-button-class',
    'Details',
    'fa fa-plus'
  );

  idHeader: MyHeaders;
  startDateHeader: MyHeaders;
  endDateHeader: MyHeaders;
  referredCustomerHeader: MyHeaders;
  rentedCarHeader: MyHeaders;
  myHeaders: MyHeaders[];

  orderByID: MyOrder;
  searchByPeriod: MySearch;
  pagination: MyPagination;
  rentalTable: MyTableConfig;

  rentals: Rental[] = [];

  filteredData = this.rentals;

  currentPage = 1;

  searchTerm = '';

  ngOnInit(): void {
    // creating headers for table
    // declaring some headers
    this.idHeader = new MyHeaders('id', 'ID');
    this.startDateHeader = new MyHeaders('startDate', 'Start Period');
    this.endDateHeader = new MyHeaders('endDate', 'End Period');
    this.referredCustomerHeader = new MyHeaders('referredCustomer', 'Referred Customer');
    this.rentedCarHeader = new MyHeaders('rentedCar', 'Rented Car');
    this.myHeaders = [
      this.idHeader,
      this.startDateHeader,
      this.endDateHeader,
      this.referredCustomerHeader,
      this.rentedCarHeader,
    ];

    // declaring order criteria
    this.orderByID = new MyOrder('0', 'asc');

    // declaring search option
    this.searchByPeriod = new MySearch(['startDate']);

    // declaring MyPagination object
    this.pagination = new MyPagination(5, [5, 10, 15, 20]);

    this.rentalTable = new MyTableConfig(
      this.myHeaders,
      this.orderByID,
      this.searchByPeriod,
      this.pagination,
      [MyTableActions.NEW_ROW, MyTableActions.EDIT, MyTableActions.DELETE]
    );

    this.listRentals();
  }

  listRentals() {

    this.rentalService.getRentals().subscribe((data) => {
      this.rentals = data;
    });
  }

  newRowHandler($event: { dataItem: any; action: any }) {
    if(!this.authService.getIsAuthenticated()) {
      this._router.navigateByUrl("/login")
    }
    else {
      if(!this.authService.isAdmin()){
        alert('Not authorized')
      }
      else
    this._router.navigateByUrl(`rental/create`)
    }
  }

  performActionOnDataHandler(event: { dataItem: any; action: string }) {

    if(!this.authService.getIsAuthenticated()) {
      this._router.navigateByUrl("/login")
    }
    else {
      if(!this.authService.isAdmin()){
        alert('Not authorized')
      }
      else {
      if (event.action === "Edit") {
        //this.rentalService.editRental(event.dataItem.id, event.dataItem)
        this._router.navigateByUrl(`rental/edit/${event.dataItem.id}`)
      }
      else if (event.action === "Delete") {
        this.rentalService.deleteRental(event.dataItem.id).subscribe(
          response => {
            this.listRentals();
          }
        )
      }
    }
  }
  }

  viewDetailsOnDataHandler(event: {dataItem: any}) {
    // view details of selected row
    this._router.navigateByUrl(`rental/${event.dataItem.id}`)
  }


}
