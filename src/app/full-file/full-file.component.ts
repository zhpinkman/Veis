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

  @Output()
  deleted: EventEmitter<FileEntity> = new EventEmitter<FileEntity>();

  ngOnInit() {}
  showEditName: boolean = false;
  hideDeleteIcon: Boolean = false;

  icons = this.consts.icons;
  submit() {
    this.showEditName = !this.showEditName;
    let Request = new RenameRequest();
    Request.parentPath = '/';
    Request.oldName = this.data.name;
    Request.newName = this.newFileName;
    this.fileService.renameFile(Request).subscribe(
      data => {
        this.data.name = this.newFileName;
      },
      error => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.showEditName = !this.showEditName;
    // this.data.name = this.fileName;
  }
  newFileName: string;
  handleRenameInput() {
    this.showEditName = !this.showEditName;
    this.newFileName = this.data.name;
  }

  delete() {
    this.hideDeleteIcon = true;
    this.fileService.deleteFile(this.data.id);
    this.deleted.emit(this.data);
  }
}
