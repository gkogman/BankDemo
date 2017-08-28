import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'UTCToLocal'
})
export class UTCToLocalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var localDate = new Date(value);
    return localDate;
  }

}
