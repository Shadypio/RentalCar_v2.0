import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rental } from 'src/app/common/rental/rental';
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
    this.idHeader = new MyHeaders('0', 'ID');
    this.startDateHeader = new MyHeaders('1', 'StartDate');
    this.endDateHeader = new MyHeaders('2', 'End Date');
    this.referredCustomerHeader = new MyHeaders('3', 'Referred Customer');
    this.rentedCarHeader = new MyHeaders('4', 'Rented Car');
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

    const newRental = new Rental(10, 'sss', 'sss', 1, 2)
    this.rentalService.create(newRental).subscribe(
      response => {}
    )
  }

  performActionOnDataHandler(event: { dataItem: any; action: string }) {
    console.log(event.dataItem, event.action);
    if (event.action === "Edit") {
      this.rentalService.editRental(event.dataItem.id, event.dataItem)
    }
    else if (event.action === "Delete") {
      this.rentalService.deleteRental(event.dataItem.id).subscribe(
        response => {
          this.listRentals();
        }
      )
    }
  }

  viewDetailsOnDataHandler(event: {dataItem: any}) {
    // view details of selected row
    this._router.navigateByUrl(`rental/${event.dataItem.id}`)
  }


}
