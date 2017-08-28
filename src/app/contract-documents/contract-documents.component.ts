import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ContractInstance, FileUpload, Document,User } from '../models';
import { Observable } from 'rxjs';
import { MdDialog, MdDialogRef } from '@angular/material';
import { UploadDocumentsComponent } from '../upload-documents/upload-documents.component';
import { DocumentsService } from '../documents.service';
@Component({
  selector: 'app-contract-documents',
  templateUrl: './contract-documents.component.html',
  styleUrls: ['./contract-documents.component.css']
})
export class ContractDocumentsComponent implements OnInit {
  @Input()
  public contractInstanceId: number;
  @Input()
  public currentUser: User;
  @Input()
  public contractInstance : ContractInstance;
  @Input()
  public Documents: Document[] = [];
 	@Output()
	public creatingDocument = new EventEmitter<boolean>();
  @Input()
  public creatingDocumentInput :boolean = false;
  constructor(public dialog: MdDialog, private documentsService: DocumentsService) {
  }

  ngOnInit() {
  }

  openUploadDocument() {
    let dialogRef: MdDialogRef<UploadDocumentsComponent>;
    dialogRef = this.dialog.open(UploadDocumentsComponent);
    dialogRef.componentInstance.submitted.subscribe(((response: FileUpload[]) => {
      this.creatingDocument.emit(true);
      this.documentsService.postDocuments(this.contractInstanceId, response).then(response => {
      })
    }).bind(this));
  }
}
