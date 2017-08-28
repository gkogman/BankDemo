import { Pipe, PipeTransform } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

@Pipe({
  name: 'arrayToMultiSelectOptionArray'
})
export class ArrayToMultiSelectOptionArrayPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (value) {
      var result: IMultiSelectOption[] = [];
      if (args == 'user') {
        for (let i = 0; i < value.length; i++) {
          result.push({ id: i + 1, name: value[i].DisplayName });
        }
      }
      else if (args == 'address') {
        for (let i = 0; i < value.length; i++) {
          result.push({ id: i + 1, name: value[i].Description });
        }
      }
      else {
        for (let i = 0; i < value.length; i++) {
          result.push({ id: i + 1, name: value[i] })
        }
      }
      return result;
    }
    return null;
  }
}
