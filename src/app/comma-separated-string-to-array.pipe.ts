import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaSeparatedStringToArray'
})
export class CommaSeparatedStringToArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.split(',');
  }

}
