import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContractInstance, ContractInstanceActivity, Document, User, ContractMetadata } from '../models';
import { ContractService } from '../contract.service';
import { BreadcrumbService } from "ng2-breadcrumb/ng2-breadcrumb";
import { ConstantsService } from '../constants.service';
import { DocumentsService } from '../documents.service';
import { UserService } from '../user.service';
@Component({
	selector: 'app-contractdetails',
	templateUrl: './contract-details.component.html',
	styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit, OnDestroy {
	public contract: ContractMetadata;
	public contractInstance: ContractInstance = null;
	public contractInstanceId: number;
	public creatingAction: boolean = false;
	public creatingDocument: boolean = false;
	public contractActivities: ContractInstanceActivity[] = [];
	public documents: Document[] = [];
	public allUsers: User[] = [];
	private updateDataInterval: any;
	public currentUser: User;

	constructor(private activatedRoute: ActivatedRoute, private documentsService: DocumentsService, private userService: UserService, private contractService: ContractService, private constants: ConstantsService, private breadcrumbService: BreadcrumbService) {
		this.breadcrumbService.addCallbackForRouteRegex('/contract/[0-9]', this.getNameForContractInstance.bind(this));
	}

	private getNameForContractInstance(id: string): string {
		if (this.contractInstance) {
			return '#' + this.contractInstance.ContractInstanceAddress.toString() + ' contract instance';
		}
		else {
			return '';
		}
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.contractInstanceId = params['id'];
			this.loadData();
		});
		this.startUpdateDataTimer();
	}

	ngOnDestroy() {
		if (this.updateDataInterval != null) {
			clearInterval(this.updateDataInterval);
		}
	}

	private setCreatingAction($event) {
		this.creatingAction = $event;
	}
	private setCreatingDocument($event) {
		this.creatingDocument = $event;
	}
	private startUpdateDataTimer() {
		this.updateDataInterval = setInterval(this.loadData.bind(this), this.constants.updateDataTime);
	}

	private loadData() {
		console.log("Refreshing Data");
		this.getAllUsers();
		this.contractService.getContractInstance(this.contractInstanceId, true).then(contractInstance => {
			this.contractInstance = contractInstance;
			if (!this.contract) {
				this.contractService.getContract(this.contractInstance.ContractID).then(contract => { this.contract = contract; });
			}
		});
		if (!this.currentUser) {
			this.userService.getUser().then(user => {
				this.currentUser = user;
			})
		}
		this.contractService.getContractInstanceActivity(this.contractInstanceId).then(activity => { this.contractActivities = activity; });
		this.documentsService.getDocuments(this.contractInstanceId).then(documents => { this.documents = documents });
		this.creatingDocument = false;
		this.creatingAction = false;
	}

	private getAllUsers(){
		this.userService.getAllUsers().then(users =>{
			this.allUsers = users;
			console.log("allUsers loading done!");
		});
	}

}
