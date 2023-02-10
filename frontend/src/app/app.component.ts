import { Component } from '@angular/core';
import { MyButtonConfig } from './components/my-button/config/my-button-config';
import { MyTableActions } from './components/my-table/config/actions/my-table-actions';
import { MyHeaders } from './components/my-table/config/header/my-headers';
import { MyTableConfig } from './components/my-table/config/my-table-config';
import { MyOrder } from './components/my-table/config/order/my-order';
import { MyPagination } from './components/my-table/config/pagination/my-pagination';
import { MySearch } from './components/my-table/config/search/my-search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  myDefaultButton: MyButtonConfig = new MyButtonConfig("my-custom-button-class", "Default text", "fa fa-icon fa-user");

  // creating headers for table
  // declaring some headers
  idHeader: MyHeaders = new MyHeaders("0", "ID");
  licensePlateHeader: MyHeaders = new MyHeaders("1", "License Plate");
  brandHeader: MyHeaders = new MyHeaders("2", "Brand");
  modelHeader: MyHeaders = new MyHeaders("3", "Model");
  yearHeader: MyHeaders = new MyHeaders("4", "Registration Year");
  categoryHeader: MyHeaders = new MyHeaders("5", "Category");
  myHeaders: MyHeaders[] = [this.idHeader, this.licensePlateHeader, this.brandHeader,
                            this.modelHeader, this.yearHeader, this.categoryHeader];

  // declaring order criteria
  orderByID: MyOrder = new MyOrder("0", "asc");

  // declaring search option
  searchByBrandAndModel : MySearch = new MySearch(['2', '3']);

  // declaring MyPagination object
  // maybe change?
  pagination : MyPagination = new MyPagination(5, [5, 10, 15, 20])

  // declaring table for displaying data cars
  carTable: MyTableConfig = new MyTableConfig(this.myHeaders, this.orderByID, this.searchByBrandAndModel, this.pagination, [MyTableActions.NEW_ROW, MyTableActions.EDIT, MyTableActions.DELETE]);

  // event
  performActionOnDataHandler(event: {dataItem: any, action: string}) {
    console.log(event.dataItem, event.action);
  }



}
