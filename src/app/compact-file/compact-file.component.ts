import { list } from '@app/animation';
import {
  MatDialog,
  MatDialogClose,
  MatDialogConfig
} from '@angular/material/dialog';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FullFileComponent } from '@app/full-file/full-file.component';
import { FileEntity } from '@app/file';
import { ConstService } from '@app/Services/const.service';
import { FileService } from '@app/Services/file.service';
import { PathClass } from '@app/PathClass';

@Component({
  selector: 'app-compact-file',
  templateUrl: './compact-file.component.html',
  styleUrls: ['./compact-file.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class CompactFileComponent implements OnInit {
  @Input('value')
  file: FileEntity;

  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key === 'Enter' && this.file.selected === true) this.openDialog();
  }
  public showMode: string = 'list';
  public mouseOn: Boolean = false;

  @Output()
  deleted: EventEmitter<FileEntity> = new EventEmitter<FileEntity>();

  constructor(
    private dialog: MatDialog,
    public consts: ConstService,
    private fileService: FileService
  ) {
    this.fileService.showMode.subscribe(value => {
      this.showMode = value.toString();
    });
  }

  ngOnInit() {
    if (this.file.isOpen == true) {
      this.openDialog();
    }
  }

  openDialog() {
    console.log('hello new list');

    const opts = new MatDialogConfig();

    opts.width = '600px';
    opts.height = '600px';

    opts.data = this.file;

    const dialogRef = this.dialog.open(FullFileComponent, opts);

    dialogRef.afterOpen().subscribe(data => console.log('opened successfully'));
    dialogRef.updatePosition(opts.position);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed!!', result);
      if (result.type === 'delete') {
        this.deleted.emit(this.file);
      }
    });
  }
  select() {
    this.fileService.select.next(this.file.name);
  }

  hoverOn() {
    this.mouseOn = true;
  }
  hoverOff() {
    this.mouseOn = false;
  }
}
