import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberOfElementsToArray'
})
export class NumberOfElementsToArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let res = [];
    for (let i = 0; i < value; i++) {
      res.push(i);
    }
    return res;
  }

}
