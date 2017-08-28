import { Pipe, PipeTransform } from '@angular/core';
import { ContractMetadata, ContractInstanceActivityParameter, ContractInstance, ContractInstanceProperty } from './models';
@Pipe({
  name: 'contractInstanceProperty'
})
export class ContractInstancePropertyPipe implements PipeTransform {

  transform(propertyInstance: ContractInstanceProperty, contractInstance?: ContractInstance): string {
    if (propertyInstance) {
      if (propertyInstance.DataType == 'user' && propertyInstance.Value == '0x0000000000000000000000000000000000000000') {
        return "-";
      }
      if (propertyInstance.DataType == 'money' && propertyInstance.Value == '0') {
        return "-";
      }
      if (propertyInstance.DataType == 'uint' && propertyInstance.Value == '0' || propertyInstance.Value == null) {
        return "-";
      }
      else {
        if (contractInstance && propertyInstance.DataType == 'user') {
          var findPersonaOfAddress = contractInstance.Personas.find(p => p.User.ChainAddress == propertyInstance.Value);
          if (findPersonaOfAddress) {
            return findPersonaOfAddress.User.DisplayName;
          }
          else {
            return propertyInstance.Value;
          }
        } else if (propertyInstance.DataType == 'money') {
          return '$' + propertyInstance.Value;
        } else if (propertyInstance.DataType == 'state') {
          return contractInstance.ContractState.DisplayName;
        }
        else if (propertyInstance.DataType == 'image' || propertyInstance.DataType == 'document') {
          var obj = JSON.parse(propertyInstance.Value);
          var urls =  obj.map(x => x.Url).join(', ');
          return urls;
        }
        else {
          return propertyInstance.Value;
        }
      }
    }
    return "-";
  }
}