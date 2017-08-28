import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  @Output()
  submitted: EventEmitter<any> = new EventEmitter<any>();
  title: string;
  message : string;
  constructor(public dialogRef: MdDialogRef<ConfirmationDialogComponent>) { }

  ngOnInit() {
  }

  accepted() {
    this.submitted.emit();
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
