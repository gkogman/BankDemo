import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestOptions, } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ContractActionParameter, ContractInstanceActivityParameterInput, FileUpload, User, ContractMetadata, UIElementContractInstanceActivityParameterInput, FileUploadIndexed } from "app/models";
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { LookupByAddressesService } from '../lookup-by-addresses.service';
declare var $: any;
import { CalendarModule } from 'primeng/primeng';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { ArrayToMultiSelectOptionArrayPipe } from '../array-to-multi-select-option-array.pipe';
import { CommaSeparatedStringToArrayPipe } from '../comma-separated-string-to-array.pipe';
import { ContractInstanceActionParameterHelperService } from '../contract-instance-action-parameter-helper.service';

import { Local } from '../../localization/Local_He';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements OnInit {
  public local:Local;
  @Output()
  submitted: EventEmitter<any[]> = new EventEmitter<any[]>();

  public UIParameters: UIElementContractInstanceActivityParameterInput[] = [];
  public parameters: ContractInstanceActivityParameterInput[] = [];
  public title = "";
  public allUsers: User[] = [];
  public userDataType: string = "user";
  public contractDataType: string = "address";
  public imageDataType: string = "image";
  public documentDataType: string = "document";
  public files: FileUploadIndexed[] = [];
  public defaultSettings: IMultiSelectSettings = {
    maxHeight: '100px',
    showUncheckAll: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'multiselect',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: false,
  };
  public customSettings: IMultiSelectSettings = {
    maxHeight: '100px',
    showUncheckAll: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'multiselect',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: false
  };

  public myTexts: IMultiSelectTexts = {
    defaultTitle: ''
  };

  constructor(private contractInstanceActionParameterHelperService: ContractInstanceActionParameterHelperService, public dialogRef: MdDialogRef<GenericModalComponent>, private lookupByAddressesService: LookupByAddressesService, private commaSeparatedStringToArrayPipe: CommaSeparatedStringToArrayPipe, private arrayToMultiSelectOptionArrayPipe: ArrayToMultiSelectOptionArrayPipe) {
    this.local=new Local();
  }

  ngOnInit() {
    for (let p = 0; p < this.parameters.length; p++) {
      this.addMinMaxArraySettingsParameter(this.parameters[p]);
      this.populateUserAndContractConstraints(this.parameters[p]);

      if (this.parameters[p].DataType == this.imageDataType) {
        this.files.push({ Index: p, FileUploads: [] });
      }
    }
  }

  public filesSubmitted(files, index) {
    var element = this.files.find(x => x.Index == index);
    if (element) {
      element.FileUploads.push(files);
    }
  }

  private populateUserAndContractConstraints(parameter: ContractInstanceActivityParameterInput) {
    if (parameter.ContractActionParameter.Constraints) {
      if (parameter.DataType == this.userDataType) {
        this.lookupUsers(parameter.ContractActionParameter.Constraints).then(result => { parameter.ContractActionParameter.ConstraintsArray = result; });
      }
      else if (parameter.DataType == this.contractDataType) {
        this.lookupContracts(parameter.ContractActionParameter.Constraints).then(result => parameter.ContractActionParameter.ConstraintsArray = result);
      }
    }
  }

  private addMinMaxArraySettingsParameter(parameter: ContractInstanceActivityParameterInput) {
    if (parameter.ContractActionParameter.MaxArraySize) {
      var customSettingsForMultiSelectComboBox = this.customSettings;
      customSettingsForMultiSelectComboBox.selectionLimit = parameter.ContractActionParameter.MaxArraySize;
      this.UIParameters.push({ Name: parameter.Name, Settings: customSettingsForMultiSelectComboBox, DataType: parameter.DataType, Value: parameter.Value, ContractActionParameter: parameter.ContractActionParameter, Selections: [] });
    }
    else {
      this.UIParameters.push({ Name: parameter.Name, Settings: this.defaultSettings, DataType: parameter.DataType, Value: parameter.Value, ContractActionParameter: parameter.ContractActionParameter, Selections: [] });

    }
  }

  public getMultiSelectOptionArray(array: any) {
    var multipleSelectionOptions = [];
    for (let i = 0; i < array.length; i++) {
      multipleSelectionOptions.push({ id: i + 1, name: array[i] });
    }
  }

  public submit(): void {
    var parameters = this.contractInstanceActionParameterHelperService.getParameters(this.UIParameters, this.allUsers, this.files);
    this.submitted.emit(parameters);
    this.dialogRef.close();
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public lookupUsers(addresses: string): Promise<User[]> {
    return this.lookupByAddressesService.lookupUsersByAddresses(addresses).then(x => { return x; });
  }

  public lookupContracts(addresses: string): Promise<ContractMetadata[]> {
    return this.lookupByAddressesService.lookupContractsByAddresses(addresses).then(x => { return x; });
  }

  public areAllArrayParametersValid() {
    if (this.UIParameters.some(x => x.Selections.length >= x.ContractActionParameter.MinArraySize)) {
      return false;
    }
    return true;
  }
}
