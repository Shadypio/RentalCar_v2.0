import { MyTableActions } from "./actions/my-table-actions";
import { MyHeaders } from "./header/my-headers";
import { MyOrder } from "./order/my-order";
import { MyPagination } from "./pagination/my-pagination";
import { MySearch } from "./search/my-search";

export class MyTableConfig {

  constructor(public headers: MyHeaders[],
    public order: MyOrder | null,
    public search: MySearch | null,
    public pagination: MyPagination | null,
    public actions: MyTableActions[] | null){}
}
