import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/common/rental/rental';
import { RentalService } from 'src/app/services/rental/rental.service';
import { MyButtonConfig } from '../my-button/config/my-button-config';
import { MyTableActions } from '../my-table/config/actions/my-table-actions';
import { MyHeaders } from '../my-table/config/header/my-headers';
import { MyTableConfig } from '../my-table/config/my-table-config';
import { MyOrder } from '../my-table/config/order/my-order';
import { MyPagination } from '../my-table/config/pagination/my-pagination';
import { MySearch } from '../my-table/config/search/my-search';

@Component({
  selector: 'app-rental-table',
  templateUrl: './rental-table.component.html',
  styleUrls: ['./rental-table.component.css'],
})
export class RentalTableComponent implements OnInit {
  constructor(
    private rentalService: RentalService,
    private route: ActivatedRoute
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

  myDefaultButton: MyButtonConfig;

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
    this.startDateHeader = new MyHeaders('1', 'Start Date');
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
    this.searchByPeriod = new MySearch(['2']);

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

  performActionOnDataHandler(event: { dataItem: any; action: string }) {
    console.log(event.dataItem, event.action);
  }

  // sort data in columns
  columnPropertyMap = new Map<string, string>([
    ['0', 'id'],
    ['1', 'startDate'],
    ['2', 'endDate'],
    ['3', 'referredCustomer'],
    ['4', 'rentedCar'],
  ]);

  sortData(headerKey: string, orderType: string) {
    /*

    console.log(`${headerKey} - ${orderType} `);

    let headerIndex: string = this.columnPropertyMap.has(headerKey)
      ? this.columnPropertyMap.get(headerKey)!
      : '';

    console.log(`${headerIndex} `);

    this.rentals.sort((a, b) => {
      if (a[headerIndex] < b[headerIndex]) {
        return orderType === 'asc' ? -1 : 1;
      } else if (a[headerIndex] > b[headerIndex]) {
        return orderType === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    /*
    this.filteredData.sort((a, b) => {
      if (a[headerIndex] < b[headerIndex]) {
        return orderType === 'asc' ? -1 : 1;
      } else if (a[headerIndex] > b[headerIndex]) {
        return orderType === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });*/
  }

  /*
  filterData(searchTerm: string): Observable<Car[]> {


    return this.cars.pipe(
      map(carsData => {
        return carsData.filter((item: Car) => {
          return Object.values(item).some((value) => {
            return value
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          });
        });
      })
    );


  }*/

  filterData(searchTerm: string) {
    console.log('a');
  }

  setItemPerPage(itemPerPage: number) {
    if (this.rentalTable?.pagination) {
      this.rentalTable.pagination.itemPerPage = itemPerPage;
      this.currentPage = 1;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  getTotalPages() {
    if (this.rentalTable?.pagination)
      return Math.ceil(
        this.rentals.length / this.rentalTable?.pagination.itemPerPage
      );
    return 1;
  }

  // the following methods are referred to actions to perform on the table
  newRow() {
    console.log('New Row Clicked');
  }

  // sending data from child to parent
  @Output() performActionOnData: EventEmitter<any> = new EventEmitter();

  performActionOnDataItem(event: { dataItem: any; action: any }) {
    this.performActionOnData.emit(event);
  }
}
