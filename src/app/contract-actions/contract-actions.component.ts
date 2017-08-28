import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ContractService } from '../contract.service';
import { UserService } from '../user.service';
import { User, ContractMetadata, ContractInstanceActivityInput, ContractInstanceActivityParameterInput, ContractInstance, ContractAction, ContractInstanceActivityParameter, ContractInstanceActivity } from '../models';
import { MdDialog, MdDialogRef } from '@angular/material';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';

@Component({
	selector: 'app-contract-actions',
	templateUrl: './contract-actions.component.html',
	styleUrls: ['./contract-actions.component.css']
})
export class ContractActionsComponent implements OnInit, OnDestroy {
	@Input()
	public contractInstance: ContractInstance;
	@Input()
	public contractActivities: ContractInstanceActivity[] = [];
	@Output()
	public creatingAction = new EventEmitter<boolean>();
	@Input()
	public currentUser: User;
	@Input()
	public allUsers: User[]= [];

	public contractMetadata: ContractMetadata;
	public contractActions: ContractAction[] = [];
	public hideComponent: boolean = false;
	private action: ContractAction = null;

	constructor(private contractService: ContractService, public dialog: MdDialog, private userService: UserService) {
	}

	ngOnInit() {
		this.loadContractInstance();
	}

	ngOnDestroy() {

	}

	loadContractInstance() {
		this.contractActions = this.contractInstance.Actions;
	}

	areActionsEnabled(): boolean {
		if (this.contractActivities.length != 0) {
			var activity = this.contractActivities[(this.contractActivities.length - 1)];
			if (activity.CompletedOn == null) {
				return false;
			}
			else {
				return true;
			}
		}
		else {
			return true;
		}
	}

	public openDialog(action: ContractAction): void {
		let dialogRef: MdDialogRef<GenericModalComponent>;
		dialogRef = this.dialog.open(GenericModalComponent);
		this.action = action;
		dialogRef.componentInstance.parameters = this.action.Parameters.map<ContractInstanceActivityParameterInput>((p) => { return { Name: p.Name, Value: null, DataType: p.DataType, ContractActionParameter: p } });
		dialogRef.componentInstance.title = this.action.DisplayName;
		dialogRef.componentInstance.allUsers = this.allUsers;
		console.log(this.allUsers);
		dialogRef.componentInstance.submitted.subscribe(((response) => { this.getCreatedAction(response) }).bind(this));
	}

	private getCreatedAction(inputs: ContractInstanceActivityParameterInput[]): void {
		var activity: ContractInstanceActivityInput = {
			ContractID: this.contractInstance.ContractID,
			ContractInstanceID: this.contractInstance.ContractInstanceID,
			ContractAction: this.action,
			Parameters: inputs
		};
		this.contractService.createContract(activity);
		this.hideComponent = true;
		this.creatingAction.emit(true);
	}
}
