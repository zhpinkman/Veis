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
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-full-file',
  templateUrl: './full-file.component.html',
  styleUrls: ['./full-file.component.scss']
})
export class FullFileComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public file: FileEntity,
    public consts: ConstService,
    private fileService: FileService,
    public dialogRef: MatDialogRef<FullFileComponent>,
    private clipboardService: ClipboardService
  ) {}

  ngOnInit() {}
  public filePrivate: Boolean = false;
  public filePublic: Boolean = true;
  public filePublicPreview: Boolean = false;
  public filePrivatePreview: Boolean = false;
  showEditName: boolean = false;
  hideDeleteIcon: Boolean = false;

  icons = this.consts.icons;
  submitEdit() {
    this.showEditName = !this.showEditName;
    let Request = new RenameRequest();
    Request.parentPath = '/';
    Request.oldName = this.file.name;
    Request.newName = this.newFileName;
    this.fileService.renameFile(Request).subscribe(
      file => {
        this.file.name = this.newFileName;
      },
      error => {
        // console.log(error);
      }
    );
  }

  cancelEdit() {
    this.showEditName = !this.showEditName;
    // this.file.name = this.fileName;
  }
  newFileName: string;
  handleRenameInput() {
    this.showEditName = !this.showEditName;
    this.newFileName = this.file.name;
  }

  delete() {
    this.hideDeleteIcon = true;
    let Request = new DeleteRequest();
    Request.path =
      this.fileService.currentPath.pathToString() + '/' + this.file.name;
    this.fileService.deleteFile(Request).subscribe(
      file => {
        this.hideDeleteIcon = false;
        this.dialogRef.close({ type: 'delete' });
      },
      error => {
        // console.log(error);
      }
    );
  }
  download() {
    window.open(this.file.url, '_blank');
    this.fileService.downloadFile(this.file.url).subscribe(() => {});
  }

  toggleAccessibility() {
    if (this.filePrivate == true) {
      this.filePrivate = false;
      this.filePublic = true;
    } else {
      this.filePublic = false;
      this.filePrivate = true;
    }
  }

  showPrivatePreview() {
    this.filePrivatePreview = true;
  }
  showPublicPreview() {
    this.filePublicPreview = true;
  }

  hidePublicPreview() {
    this.filePublicPreview = false;
  }
  hidePrivatePreview() {
    this.filePrivatePreview = false;
  }
}
