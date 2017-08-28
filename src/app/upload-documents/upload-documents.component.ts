import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { RequestOptions, } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ContractActionParameter, ContractInstanceActivityParameterInput, FileUpload } from "app/models";

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {
  @Output()
  submitted: EventEmitter<FileUpload[]> = new EventEmitter<FileUpload[]>();

  public files: FileUpload[] = [];

  constructor(public dialogRef: MdDialogRef<UploadDocumentsComponent>) { }

  ngOnInit() {
  }

  public filesSubmitted(files) {
    this.files = files;
  }
  
  public submit(): void {
    this.submitted.emit(this.files);
    this.dialogRef.close();
  }

  public cancel(): void {
    this.dialogRef.close();
  }

}
