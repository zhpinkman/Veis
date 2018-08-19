import { FileObj } from '@app/FileObj';
import { FileService } from '@app/Services/file.service';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-upload-toast-popup',
  templateUrl: './upload-toast-popup.component.html',
  styleUrls: ['./upload-toast-popup.component.scss'],
  host: {
    '[class.mat-elevation-z3]': 'true'
  }
})
export class UploadToastPopupComponent implements OnInit, OnChanges {
  @Input()
  files: FileList;

  @Output()
  closeMe: EventEmitter<any> = new EventEmitter<any>();

  fileObjs: FileObj[] = [];

  constructor(private fileService: FileService) {}

  ngOnInit() {}

  handleProgressChange = (progress, i) => {
    this.fileObjs[i].file = this.files[i];
    this.fileObjs[i].progress = progress.percentage;
  };

  ngOnChanges() {
    this.fileObjs = [];
    for (let i = 0; i < this.files.length; i++) {
      this.fileObjs.push({ file: this.files[i], progress: undefined });
    }
    this.fileService.upload(this.files, this.handleProgressChange);
  }

  closeToast() {
    this.closeMe.emit();
  }
}
