import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ContractActionParameter, ContractInstanceActivityParameterInput, FileUpload } from "app/models";
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.css']
})

export class FileSelectorComponent implements OnInit {
  @Input()
  index: number = 0;

  @Output()
  submitted: EventEmitter<FileUpload[]> = new EventEmitter<FileUpload[]>();

  public selectedImg: FileUpload;
  public files: FileUpload[] = [];
  public inputName: string;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.inputName = "selectedFile" + this.index;
  }

  private onClick(event) {
    if ($.inArray(event.target, $(".selected")) <= -1) {
      if (this.selectedImg != null) {// or some similar check
        this.selectedImg = null;
      }
    }
  }

  private selectImage(img: FileUpload) {
    if (this.selectedImg && img.Url == this.selectedImg.Url) {
      var indexToDelete = this.files.indexOf(this.selectedImg);
      if (indexToDelete > -1) {
        this.files.splice(indexToDelete, 1);
      }
      this.selectedImg = null;
    }
    else {
      this.selectedImg = img;
    }
  }

  private fileChange(event) {
    var fileToAdd;
    for (let i = 0; i < event.target.files.length; i++) {
      fileToAdd = event.target.files[i];
      if (!this.files.some(x => x.File.name == fileToAdd.name)) {
        var url = window.URL.createObjectURL(fileToAdd);
        let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(url);
        var fileReader = new FileReader();
         fileReader.onload = (function(f) {
            return function(e) {
              this.files.push({ File: f, FileAsText: fileReader.result, Url: sanitizedUrl });
            };
        })(fileToAdd).bind(this);

        fileReader.readAsDataURL(fileToAdd);
      }
    }
    this.submitted.emit(this.files);
  }

  private clearAlertMessage() {
    $('#selectedFile').val(""); // Or you can use: document.getElementById("file").value = "";
  }
}
