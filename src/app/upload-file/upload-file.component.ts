import { FileService } from './../Services/file.service';
import { AuthService } from '@app/Services/auth.service';
import { Component, OnInit, EventEmitter } from '@angular/core';

import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions
} from 'ngx-uploader';
import { HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from '@app/Services/utilities.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  ngOnInit() {}

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(
    private fileService: FileService,
    private authService: AuthService,
    private utilitiesService: UtilitiesService
  ) {
    this.utilitiesService.setTitle('Upload Files');
    this.options = { concurrency: 1 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  onUploadOutput(output: UploadOutput): void {
    console.log(output);
    if (output.type === 'allAddedToQueue') {
      // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (
      output.type === 'addedToQueue' &&
      typeof output.file !== 'undefined'
    ) {
      // add file to array when added
      if (
        this.files.findIndex(
          file =>
            typeof output.file !== 'undefined' && file.name === output.file.name
        ) == -1
      )
        this.files.push(output.file);
      else
        this.utilitiesService.error(
          'Already there!',
          `${output.file.name} is already on the list!`
        );
    } else if (
      output.type === 'uploading' &&
      typeof output.file !== 'undefined'
    ) {
      // update current data in files array for uploading file
      const index = this.files.findIndex(
        file =>
          typeof output.file !== 'undefined' && file.name === output.file.name
      );
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter(
        (file: UploadFile) => file !== output.file
      );
    } else if (output.type === 'removedAll') {
      this.files = [];
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (
      output.type === 'done' &&
      output.file &&
      output.file.responseStatus === 401
    ) {
      this.authService.refreshToken().subscribe(() => {
        location.reload();
      });
    }
  }

  startUpload(): void {
    let token = this.authService.getBearerToken();
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:9500/file/upload',
      method: 'POST',
      headers: { Authorization: 'bearer ' + token }, // <----  set headers
      data: { path: this.fileService.currentPath.pathToString() }
    };
    console.log(this.fileService.currentPath.pathToString());

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
}
