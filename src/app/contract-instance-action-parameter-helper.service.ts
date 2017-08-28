import { Injectable } from '@angular/core';
import { UIElementContractInstanceActivityParameterInput, User } from "app/models";
import { ArrayToMultiSelectOptionArrayPipe } from './array-to-multi-select-option-array.pipe';
import { CommaSeparatedStringToArrayPipe } from './comma-separated-string-to-array.pipe';

@Injectable()
export class ContractInstanceActionParameterHelperService {

  public userDataType: string = "user";
  public contractDataType: string = "address";
  public imageDataType: string = "image";
  public documentDataType: string = "document";

  constructor(private commaSeparatedStringToArrayPipe: CommaSeparatedStringToArrayPipe, private arrayToMultiSelectOptionArrayPipe: ArrayToMultiSelectOptionArrayPipe) {

  }

  public getParameters(UIParameters: UIElementContractInstanceActivityParameterInput[], allUsers: User[], files: any[] = null) {
    for (let i = 0; i < UIParameters.length; i++) {
      if (UIParameters[i].DataType == "datetime") {
        var date = new Date(UIParameters[i].Value);
        UIParameters[i].Value = date.toISOString();
      }
      else if (UIParameters[i].DataType == this.userDataType && UIParameters[i].ContractActionParameter.IsArray) {
        if (UIParameters[i].ContractActionParameter.Constraints && UIParameters[i].ContractActionParameter.Constraints != null) {
          var array = [];
          var constraints = this.arrayToMultiSelectOptionArrayPipe.transform(UIParameters[i].ContractActionParameter.ConstraintsArray, this.userDataType);
          for (let p = 0; p < UIParameters[i].Selections.length; p++) {
            array.push(UIParameters[i].ContractActionParameter.ConstraintsArray[UIParameters[i].Selections[p] - 1].ChainAddress);
          }
          UIParameters[i].Value = JSON.stringify(array);
        }
        else {
          var array = [];
          var constraints = this.arrayToMultiSelectOptionArrayPipe.transform(allUsers, this.userDataType);
          for (let p = 0; p < UIParameters[i].Selections.length; p++) {
            array.push(allUsers[UIParameters[i].Selections[p] - 1].ChainAddress);
          }
          UIParameters[i].Value = JSON.stringify(array);
        }
      }
      else if (UIParameters[i].DataType == this.contractDataType && UIParameters[i].ContractActionParameter.IsArray) {
        if (UIParameters[i].ContractActionParameter.Constraints) {
          var array = [];
          var constraints = this.arrayToMultiSelectOptionArrayPipe.transform(UIParameters[i].ContractActionParameter.ConstraintsArray, this.contractDataType);
          for (let p = 0; p < UIParameters[i].Selections.length; p++) {
            array.push(UIParameters[i].ContractActionParameter.ConstraintsArray[UIParameters[i].Selections[p] - 1].ContractInstanceAddress);
          }
          UIParameters[i].Value = JSON.stringify(array);
        }
      }
      else if (UIParameters[i].DataType != this.userDataType && UIParameters[i].DataType != this.contractDataType && UIParameters[i].ContractActionParameter.IsArray) {
        var array = [];
        var constraints = this.commaSeparatedStringToArrayPipe.transform(UIParameters[i].ContractActionParameter.Constraints);
        constraints = this.arrayToMultiSelectOptionArrayPipe.transform(constraints, "");
        for (let p = 0; p < UIParameters[i].Selections.length; p++) {
          array.push(constraints.find(x => x.id == UIParameters[i].Selections[p]));
        }
        UIParameters[i].Value = JSON.stringify(array.map(x => x.name));
      } else if (UIParameters[i].DataType == this.imageDataType || UIParameters[i].DataType == this.documentDataType) {
				var filesForParameter = files.find(x => x.Index == i);
				var filesText = filesForParameter.FileUploads.map((fileUpload : any) => fileUpload.map(file => { return { Name: file.File.name, FileAsText: file.FileAsText }}));
				UIParameters[i].Value = JSON.stringify(filesText[0]);
      }
    }
    return UIParameters;
  }
}
