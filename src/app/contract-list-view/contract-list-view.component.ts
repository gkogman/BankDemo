import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContractService } from '../contract.service';
import { UserService } from '../user.service';
import { User, ContractMetadata, ContractInstanceProperty, ContractInstance, ContractProperty, ContractInstanceActivity, ContractInstanceActivityParameterInput, ContractInstanceActivityInput, Notification } from '../models';
import { Location, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { Logger } from "angular2-logger/core";
import { BreadcrumbService } from "ng2-breadcrumb/ng2-breadcrumb";
import { ConstantsService } from '../constants.service';
import {ContractMetadataHelperService} from '../contract-metadata-helper.service';
@Component({
	selector: 'app-contract-list-view',
	templateUrl: './contract-list-view.component.html',
	styleUrls: ['./contract-list-view.component.css'],
})
export class ContractListViewComponent implements OnInit, OnDestroy {
	public contractMetadataId: number;
	public contractMetadata: ContractMetadata;
	public contractInstances: ContractInstance[];
	public contractProperties: ContractProperty[] = [];
	public notifications: Notification[] = [];
	public currentUser: User;
	public canCreateContract: boolean = false;
	public creatingContract: boolean = false;
	private updateDataInterval: any;
	public isLoadingData : boolean = true;
	public allUsers : User[] = [];
	public contractCountAtCreation: number;

	constructor(private contractMetadataService : ContractMetadataHelperService, private activatedRoute: ActivatedRoute, 
		private constants: ConstantsService, private router: Router, private userService: UserService, private contractService: ContractService,
		public dialog: MdDialog, private _logger: Logger, private breadcrumbService: BreadcrumbService) {
		this.breadcrumbService.addCallbackForRouteRegex('/contracts/[0-9]$', this.contractMetadataService.getNameForContractType.bind(this));
	}


	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.contractMetadataId = params['id'];
			if (!this.contractMetadataId) {
				this._logger.error('id parameter not set. Must provide a contract id.');
			}
			this.contractService.getContract(this.contractMetadataId).then(contractMetadata => {
				this.contractMetadata = contractMetadata
				this.contractProperties = contractMetadata.Properties;
				this.loadData();
			});
		});
		this.startUpdateDataTimer();
	}

	ngOnDestroy() {
		if (this.updateDataInterval != null) {
			clearInterval(this.updateDataInterval);
		}
	}

	private loadData(): void {
		console.log("Refreshing Data");
		this.isLoadingData = false;
		this.userService.getAllUsers().then(users => {
			this.allUsers = users;
		}).catch(error => this._logger.error(error));
		this.contractService.getContractInstances(this.contractMetadata.ContractID).then(contractInstances => {
			console.log(contractInstances);
			this.contractInstances = contractInstances.filter((instance) => instance.Properties.some(prop => prop.Value != null));
			this.canCreateContract = this.contractMetadata.Actions.find(x => x.DisplayName == "Create") != null;
			if (this.creatingContract && this.contractInstances.length > this.contractCountAtCreation) {
				this.creatingContract = false;
			}
			this._logger.log(this.contractInstances);
		}).catch(error => this._logger.error(error));
		this.contractService.getNotifications(this.contractMetadata.ContractID).then(notificationsArray => {
			console.log(notificationsArray);
			this.notifications = notificationsArray;

		}).catch(error => this._logger.error(error));
		if (!this.userService.currentUser) {
			this.userService.getUser().then(user => {
				console.log(user);
				this.currentUser = user;
			})
		}
		else{
			this.currentUser = this.userService.currentUser;
		}
	}

	private isUserInitiator()
{
	 if(this.currentUser.Roles && this.currentUser.Roles.some(x=>x.Name == 'Initiator')){
		 return true;
	 }
	 return false;
}
	private startUpdateDataTimer() {
		if (this.updateDataInterval) {
			clearInterval(this.updateDataInterval);
		}
		this.updateDataInterval = setInterval(this.loadData.bind(this), this.constants.updateDataTime);
	}

	public createContract(): void {
		if (this.currentUser != null) {
			let dialogRef: MdDialogRef<GenericModalComponent>;
			dialogRef = this.dialog.open(GenericModalComponent);
			var action = this.contractMetadata.Actions.find(x=>x.IsInitiatingAction == true);
			dialogRef.componentInstance.title = action.DisplayName;
			dialogRef.componentInstance.allUsers = this.allUsers;
			console.log(this.allUsers);
			dialogRef.componentInstance.parameters = action.Parameters.map<ContractInstanceActivityParameterInput>((p) => { return { Name: p.DisplayName, Value: null, DataType: p.DataType, ContractActionParameter: p } });
			dialogRef.componentInstance.submitted.subscribe(((response) => { this.getCreatedContract(response) }).bind(this));
		}
	}

	private getCreatedContract(inputs: ContractInstanceActivityParameterInput[]): void {
		var activity: ContractInstanceActivityInput = {
			ContractID: this.contractMetadata.ContractID,
			ContractAction: this.contractMetadata.Actions.find(x=>x.IsInitiatingAction == true),
			Parameters: inputs
		};
		this.contractCountAtCreation = this.contractInstances.length;
		this.creatingContract = true;
		this.contractService.createContract(activity);
		this.startUpdateDataTimer();
	}

	public goToPage(contractInstanceId: any) {
		this.router.navigate(['/contracts', this.contractMetadata.ContractID, contractInstanceId]);
	}
}
