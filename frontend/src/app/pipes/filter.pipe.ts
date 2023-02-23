import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, columns: string[]): any[] {
    const resultArray: any[] = [];
    if (value.length === 0 || filterString === '' || columns.length === 0)
      return value;

      value.forEach((item) => {
        columns.forEach(column => {
          if (item[column]
            .toLowerCase()
            .includes(filterString.toLowerCase())) {
            resultArray.push(item);
            return;
          }
        });
      });

      return resultArray;


  }
}
