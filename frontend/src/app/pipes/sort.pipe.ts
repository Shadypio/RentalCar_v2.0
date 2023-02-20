import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  // orderType
  transform(value: Array<any>, args: any[]): any {

    const sortFieldFromArgs = args[0];
    const sortField = sortFieldFromArgs.toLowerCase();
    const sortDirection = args[1];

    let multiplier = 1;

    if (sortDirection === 'desc') {
      multiplier = -1
    }

    console.log(`prima stampa ${sortField} ${sortDirection}`);
    value.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier;
      } else if (a[sortField] > b[sortField]){
        return 1 * multiplier;
      } else
        return 0;
    })

    return value;
  }

}
