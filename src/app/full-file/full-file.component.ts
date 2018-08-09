<<<<<<< HEAD
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
=======
import { FileService } from '@app/Services/file.service';
import { RenameRequest } from './../renameRequest';
import { Component, OnInit, Inject, Pipe, PipeTransform } from '@angular/core';
>>>>>>> 5003dc16c64e18be628ae2459962b54b4385b9d0
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileEntity } from '@app/file';
import { ConstService } from '@app/Services/const.service';
import { FileService } from '@app/Services/file.service';

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

  @Output() click: EventEmitter<FileEntity> = new EventEmitter<FileEntity>();

  ngOnInit() {}
  showEditName: boolean = false;
  fileName: string = this.data.name;
  hideDeleteIcon: Boolean = false;

  handleRenameInput() {
    this.showEditName = !this.showEditName;
  }

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

  delete() {
    this.hideDeleteIcon = true;
    this.fileService.deleteFile(this.data.Id);
    this.click.emit(this.data);
  }

  cancel() {
    this.showEditName = !this.showEditName;
    this.data.name = this.fileName;
  }
}
