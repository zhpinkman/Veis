import { Component, OnInit, Inject, Pipe, PipeTransform } from '@angular/core';
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
    public consts: ConstService
  ) {}

  ngOnInit() {}
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
  }

  delete() {
    this.hideDeleteIcon = true;
  }
}
