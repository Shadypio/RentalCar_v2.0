import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  // orderType
  transform(value: Array<any>, args: any[]): any {

    const sortField = args[0];
    const sortDirection = args[1];

    let multiplier = 1;

    if (sortDirection === 'desc') {
      multiplier = -1
    }

    console.log(`${sortField} ${sortDirection}`);
    value.sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) {
        console.log(`ret -1`);
        return -1 * multiplier;
      } else if (a[sortField] > b[sortField]){
        console.log(`ret 1`);
        return 1 * multiplier;
      } else
        console.log(`${a[sortField]} ${b[sortField]} ret 0`);
        return 0;
    })

    return value;
  }

}
