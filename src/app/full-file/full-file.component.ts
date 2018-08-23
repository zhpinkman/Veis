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
import { RenameRequest } from '@app/renameRequest';
import { DeleteRequest } from '@app/DeleteRequest';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private fileService: FileService,
    public dialogRef: MatDialogRef<FullFileComponent>
  ) {}

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
        // console.log(error);
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
    let Request = new DeleteRequest();
    Request.path =
      this.fileService.currentPath.pathToString() + '/' + this.data.name;
    this.fileService.deleteFile(Request).subscribe(
      data => {
        this.hideDeleteIcon = false;
        this.dialogRef.close({ type: 'delete' });
      },
      error => {
        // console.log(error);
      }
    );
  }
}
