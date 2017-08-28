import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Transaction, ContractInstance, TransactionUIBlock } from '../models';
import { ContractService } from '../contract.service';
declare var $: any;

@Component({
	selector: 'app-contract-transactions',
	templateUrl: './contract-transactions.component.html',
	styleUrls: ['./contract-transactions.component.css']
})
export class ContractTransactionsComponent implements OnInit {
	@Input()
	public contractInstance: ContractInstance;
	public transactions: any[] = [];
	public selectedTransaction: TransactionUIBlock;
	public transactionBlocks : TransactionUIBlock[] = [];
constructor(private contractService: ContractService) {
	}

	ngOnInit() {
		this.loadContractInstance();
	}

	loadContractInstance() {
		this.transactions = this.contractInstance.Transactions;
		for(let i = 0; i < this.transactions.length; i++){
					var associatedBlock = this.contractInstance.Blocks.find(block => block.ID ==  this.transactions[i].AssociatedBlockID);
					if(associatedBlock)
					{
					this.transactionBlocks.push({
					Transaction : this.transactions[i],
					Block : associatedBlock
					});
				}
				else{
				this.transactionBlocks.push({
					Transaction : this.transactions[i]
					});
				}
				
			}
		this.selectedTransaction = this.transactionBlocks[0];
	}

	public isSelectedTransaction(transaction: TransactionUIBlock) {
		if (this.selectedTransaction == transaction) {
			return true;
		}
		return false;
	}

	public selectTransaction(transaction: TransactionUIBlock): void {
		this.selectedTransaction = transaction;
	}

	public getCalloutPosition(): number {
		var selectedElementTop = $(".selected").offset().top;
		var scrolledAreaTop = $(".selected").parent().parent()[0].parentNode.scrollTop;
		var scrollableAreaTop = $(".selected").parent().parent().offset().top;
		var scrollableAreaHeight = $(".selected").parent().parent()[0].clientHeight;
		var calculation = (((selectedElementTop) - scrolledAreaTop) - (scrollableAreaTop)) + 20;
		if (calculation < 55) {
			return 55;

		}
		else if(calculation > (scrollableAreaHeight ))
		{
			return  445;
		}
		else {
			return calculation;
		}
	}

}
