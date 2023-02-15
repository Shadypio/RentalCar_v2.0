import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyButtonConfig } from '../my-button/config/my-button-config';
import { MyTableActions } from '../my-table/config/actions/my-table-actions';
import { MyHeaders } from '../my-table/config/header/my-headers';
import { MyTableConfig } from '../my-table/config/my-table-config';
import { MyOrder } from '../my-table/config/order/my-order';
import { MyPagination } from '../my-table/config/pagination/my-pagination';
import { MySearch } from '../my-table/config/search/my-search';

@Component({
  selector: 'app-table-parent',
  templateUrl: './table-parent.component.html',
  styleUrls: ['./table-parent.component.css'],
})

export class TableParentComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  myDefaultButton: MyButtonConfig;

  idHeader: MyHeaders;
  licensePlateHeader: MyHeaders;
  brandHeader: MyHeaders;
  modelHeader: MyHeaders;
  yearHeader: MyHeaders;
  categoryHeader: MyHeaders;
  myHeaders: MyHeaders[];

  orderByID: MyOrder;
  searchByBrandAndModel: MySearch
  pagination: MyPagination
  carTable: MyTableConfig

  ngOnInit(): void {
    this.myDefaultButton = new MyButtonConfig(
      'my-custom-button-class',
      'Default text',
      'fa fa-icon fa-user'
    );

    // creating headers for table
    // declaring some headers
    this.idHeader = new MyHeaders('0', 'ID');
    this.licensePlateHeader = new MyHeaders('1', 'License Plate');
    this.brandHeader = new MyHeaders('2', 'Brand');
    this.modelHeader = new MyHeaders('3', 'Model');
    this.yearHeader = new MyHeaders('4', 'Registration Year');
    this.categoryHeader = new MyHeaders('5', 'Category');
    this.myHeaders = [
      this.idHeader,
      this.licensePlateHeader,
      this.brandHeader,
      this.modelHeader,
      this.yearHeader,
      this.categoryHeader,
    ];

    // declaring order criteria
    this.orderByID = new MyOrder('0', 'asc');

    // declaring search option
    this.searchByBrandAndModel = new MySearch(['2', '3']);

    // declaring MyPagination object
    this.pagination = new MyPagination(5, [5, 10, 15, 20]);

    // declaring table for displaying data cars
    this.carTable = new MyTableConfig(
      this.myHeaders,
      this.orderByID,
      this.searchByBrandAndModel,
      this.pagination,
      [MyTableActions.NEW_ROW, MyTableActions.EDIT, MyTableActions.DELETE]
    );
  }

  performActionOnDataHandler(event: { dataItem: any; action: string }) {
    console.log(event.dataItem, event.action);
  }
}
