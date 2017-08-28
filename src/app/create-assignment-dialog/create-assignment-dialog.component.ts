import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContractService } from '../contract.service';
import { UserService } from '../user.service';
import { ContractMetadata, User, Persona, UserAssignment } from '../models';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Local } from '../../localization/Local_He';

@Component({
  selector: 'app-create-assignment-dialog',
  templateUrl: './create-assignment-dialog.component.html',
  styleUrls: ['./create-assignment-dialog.component.css']
})
export class CreateAssignmentDialogComponent implements OnInit {
  local:Local;
  @Output()
  submitted: EventEmitter<UserAssignment> = new EventEmitter<UserAssignment>();
  isEdit: boolean = false;
  userAssignmentToEdit: UserAssignment;
  contracts: ContractMetadata[];
  users: User[];
  personas: Persona[];
  selectedContract: ContractMetadata;
  selectedUser: User;
  selectedPersona: Persona;
  title: string;
  isLoadingUsers: boolean = true;
  isLoadingContracts: boolean = true;
  isLoadingPersonas: boolean = false;

  constructor(private contractService: ContractService, private userService: UserService, public dialogRef: MdDialogRef<CreateAssignmentDialogComponent>) {
  this.local=new Local();
  }

  ngOnInit() {
    this.contractService.getAllContracts().then(response => {
      this.contracts = response;
      this.isLoadingContracts = false;
      if (this.isEdit) {
        this.isLoadingPersonas = true;
        this.selectedContract = this.contracts.find(x => x.ContractID == this.userAssignmentToEdit.Contract.ContractID);
        this.contractService.getContract(this.selectedContract.ContractID).then(contract => {
          this.personas = contract.Personas;
          this.selectedPersona = contract.Personas.find(x => x.PersonaID == this.userAssignmentToEdit.Persona.ContractPersonaID);
          this.isLoadingPersonas = false;
        });
      }
      else {
        //Fix for Edge bug: Setting index as -1 to have no selection in the combobox
        window.setTimeout(() => { (document.getElementById('contractSelect') as HTMLSelectElement).selectedIndex = -1 });
      }

    });
    this.userService.getAllUsers(true).then(response => {
      this.users = response;
      this.isLoadingUsers = false;
      if (this.isEdit) {
        this.selectedUser = this.users.find(x => x.ExternalID == this.userAssignmentToEdit.User.ExternalID);
      }
      else {
        //Fix for Edge bug: Setting index as -1 to have no selection in the combobox
        window.setTimeout(() => { (document.getElementById('userSelect') as HTMLSelectElement).selectedIndex = -1 });
      }
    });
  }

  onChange(newValue) {
    this.isLoadingPersonas = true;
    this.contractService.getContract(newValue.ContractID).then(contract => {
      this.personas = contract.Personas;
      this.isLoadingPersonas = false;
      //Fix for Edge bug: Setting index as -1 to have no selection in the combobox
      window.setTimeout(() => { (document.getElementById('personaSelect') as HTMLSelectElement).selectedIndex = -1 });
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if (this.selectedContract && this.selectedUser && this.selectedPersona) {
      if (!this.isEdit) {
        var userAssignment: UserAssignment = { ID: 0, User: this.selectedUser, Persona: this.selectedPersona, Contract: this.selectedContract };
        this.submitted.emit(userAssignment);
        this.dialogRef.close();
      }
      else {
        console.log(this.userAssignmentToEdit.ID);
        var userAssignment: UserAssignment = { ID: this.userAssignmentToEdit.ID, User: this.selectedUser, Persona: this.selectedPersona, Contract: this.selectedContract };
        this.submitted.emit(userAssignment);
        this.dialogRef.close();
      }
    }
  }

}
