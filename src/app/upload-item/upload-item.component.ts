import { FileObj } from './../FileObj';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadFile, humanizeBytes } from 'ngx-uploader';

@Component({
  selector: 'app-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrls: ['./upload-item.component.scss']
})
export class UploadItemComponent implements OnInit {
  humanizeBytes: Function;
  constructor() {
    this.humanizeBytes = humanizeBytes;
  }

  @Input('file')
  fileObj: FileObj;
  @Input()
  index: number;
  @Output()
  removeMe: EventEmitter<any> = new EventEmitter<any>();

  humanSize: string;
  ngOnInit() {
    this.humanSize = humanizeBytes(this.fileObj.file.size);
  }

  deleteMe(): void {
    this.removeMe.emit();
  }
}
