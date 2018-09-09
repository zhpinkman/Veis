import { Component, OnInit, EventEmitter, OnChanges } from '@angular/core';
import {
  UploadFile,
  UploaderOptions,
  UploadInput,
  humanizeBytes,
  UploadOutput
} from 'ngx-uploader';
import { FileService } from '@app/Services/file.service';
import { AuthService } from '@app/Services/auth.service';
import { UtilitiesService } from '@app/Services/utilities.service';

@Component({
  selector: 'app-upload-drop-zone',
  templateUrl: './upload-drop-zone.component.html',
  styleUrls: ['./upload-drop-zone.component.scss']
})
export class UploadDropZoneComponent implements OnInit, OnChanges {
  files: FileList;

  isDragOver: Boolean = false;
  isHidden: Boolean = true;

  ngOnInit() {
    this.enableDropZone();
    this.utilitiesService.setTitle('My Files');
  }

  constructor(
    private fileService: FileService,
    private authService: AuthService,
    private utilitiesService: UtilitiesService
  ) {
    // this.utilitiesService.setTitle('Upload Files');
    // console.log(this.files);
  }
  ngOnChanges(changes) {
    // console.log(changes);
  }
  enableDropZone() {
    let timeout,
      tempIsDragOver = true;
    const handleFileSelect = evt => {
      evt.stopPropagation();
      evt.preventDefault();

      this.files = evt.dataTransfer.files; // FileList object.
      this.isHidden = false;
      this.isDragOver = false;
      // console.log(this.files);
    };

    const handleDragOver = evt => {
      evt.stopPropagation();
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
      this.isDragOver = true;
      tempIsDragOver = true;
    };

    const handleDragOut = evt => {
      evt.stopPropagation();
      evt.preventDefault();
      tempIsDragOver = false;
      // console.log(this.isDragOver);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (tempIsDragOver === false) this.isDragOver = false;
      }, 200);
    };
    const handleDragIn = evt => {
      evt.stopPropagation();
      evt.preventDefault();
      this.isDragOver = true;
      tempIsDragOver = true;
      // console.log(this.isDragOver);
    };
    const handleDragOutInstant = evt => {
      evt.stopPropagation();
      evt.preventDefault();
      this.isDragOver = false;
      tempIsDragOver = false;
      // console.log(this.isDragOver);
    };

    // Setup the dnd listeners.
    var dropZone = document.getElementsByTagName('body');
    // console.log(dropZone);

    dropZone[0].addEventListener('dragover', handleDragOver, false);
    dropZone[0].addEventListener('drop', handleFileSelect, false);
    dropZone[0].addEventListener('dragleave', handleDragOut, false);
    dropZone[0].addEventListener('dragenter', handleDragIn, false);
    // console.log(this.files);
  }
}
