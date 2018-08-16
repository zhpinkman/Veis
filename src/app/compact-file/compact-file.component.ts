import {
  MatDialog,
  MatDialogClose,
  MatDialogConfig
} from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { FullFileComponent } from '@app/full-file/full-file.component';
import { FileEntity } from '@app/file';
import { ConstService } from '@app/Services/const.service';
import { FileService } from '@app/Services/file.service';
import { PathClass } from '@app/PathClass';

@Component({
  selector: 'app-compact-file',
  templateUrl: './compact-file.component.html',
  styleUrls: ['./compact-file.component.scss']
})
export class CompactFileComponent implements OnInit {
  @Input('value')
  file: FileEntity;

  public showMode: string = 'compact';
  public mouseOn: Boolean = false;

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
    const opts = new MatDialogConfig();

    opts.width = '600px';
    opts.height = '600px';

    opts.data = this.file;

    const dialogRef = this.dialog.open(FullFileComponent, opts);

    dialogRef.afterOpen().subscribe(data => console.log('opened successfully'));
    dialogRef.updatePosition(opts.position);

    dialogRef.afterClosed().subscribe(resutl => {
      console.log('The dialog was closed!!');
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
