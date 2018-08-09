import { humanizeBytes } from 'ngx-uploader';
import {
  Component,
  OnInit,
  Inject,
  Pipe,
  PipeTransform,
  Output,
  EventEmitter
} from '@angular/core';

import { FileService } from '@app/Services/file.service';
import { RenameRequest } from './../renameRequest';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileEntity } from '@app/file';
import { ConstService } from '@app/Services/const.service';

@Component({
  selector: 'app-full-file',
  templateUrl: './full-file.component.html',
  styleUrls: ['./full-file.component.scss']
})
export class FullFileComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FileEntity,
    public consts: ConstService,
    private fileService: FileService
  ) {}

  @Output() deleted: EventEmitter<FileEntity> = new EventEmitter<FileEntity>();

  ngOnInit() {}
  fileName: string = this.data.name;
  showEditName: boolean = false;
  hideDeleteIcon: Boolean = false;

  icons = {
    txt: ' fa-file text-info ',
    jpg: ' text-warning fa-image ',
    dir: ' fa-folder text-primary ',
    cpp: ' fa-code text-danger ',
    pdf: ' fa-file-pdf-o text-danger '
  };
  submit() {
    this.showEditName = !this.showEditName;
    let Request = new RenameRequest();
    Request.parentPath = '/';
    Request.oldName = this.fileName;
    Request.newName = this.data.name;
    this.fileService.renameFile(Request).subscribe(
      data => {
        this.fileName = this.data.name;
      },
      error => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.showEditName = !this.showEditName;
    this.data.name = this.fileName;
  }

  delete() {
    this.hideDeleteIcon = true;
    this.fileService.deleteFile(this.data.id);
    this.deleted.emit(this.data);
  }
}

@Pipe({ name: 'size' })
export class SizeHandler implements PipeTransform {
  humanizeBytes: Function;
  constructor() {
    this.humanizeBytes = humanizeBytes;
  }
  transform(value: number): string {
    return this.humanizeBytes(value);
  }
}
