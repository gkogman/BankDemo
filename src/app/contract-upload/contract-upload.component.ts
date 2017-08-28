import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../models';
import { UploadService } from '../upload.service';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { ToastConfig } from 'ngx-toastr';

@Component({
  selector: 'app-contractupload',
  templateUrl: './contract-upload.component.html',
  styleUrls: ['./contract-upload.component.css']
})

export class ContractUploadComponent implements OnInit {
  public form: FormGroup;
  private files = {};
  private SUBMIT_BTN_TEXT = 'Upload';
  private IN_PROGRESS_TEXT = 'In progress';
  public contractInputID = 'contract';
  public configInputID = 'config';
  public uiConfigInputID = 'uiConfig';
  public submitBtnText = this.SUBMIT_BTN_TEXT;
  public processing = false;
  private toastConfig: ToastConfig = { closeButton: true, tapToDismiss: true, timeOut: 0 };


  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private uploadService: UploadService, private fb: FormBuilder, private toastrService: ToastrService) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      contract: [''],
      config: [''],
      uiConfig: ['']
    });
  }

  public fileChange(event) {
    let files = event.target.files;
    let elementId = event.srcElement.id;
    if (files.length != 1) {
      return;
    }

    this.files[elementId] = files[0];
  }

  public isValid() {
    return this.files[this.contractInputID] &&
      this.files[this.configInputID] &&
      this.files[this.uiConfigInputID] &&
      !this.processing;
  }

  public reset() {
    this.form.reset();
    this.files = {};
  }

  public upload() {
    if (!this.isValid()) {
      this.toastrService.error('Make sure to select a file for all three fields', 'Invalid Files', this.toastConfig);
      return;
    }

    this.processing = true;
    this.submitBtnText = this.IN_PROGRESS_TEXT;

    this.uploadService.postUploadContract(this.files)
      .then((response) => {
        this.processing = false;
        this.submitBtnText = this.SUBMIT_BTN_TEXT;
        this.reset();
        this.toastrService.success('Contract successfully uploaded', 'Success', this.toastConfig);
      }).catch((err) => {
        this.processing = false;
        this.submitBtnText = this.SUBMIT_BTN_TEXT;

        if (err.status == 500) {
          var msg = err;
          if (err._body) {
            var body = JSON.parse(err._body);
            msg = body.message;
          }

          this.toastrService.error(msg, 'Failed', this.toastConfig);
        } else {
          this.toastrService.error(err, 'Failed', this.toastConfig);
        }
      })
  }
}
