import { MatDialog, MatDialogClose, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { FullFileComponent } from '@app/full-file/full-file.component';
import { FileEntity } from '@app/file';

@Component({
  selector: 'app-compact-file',
  templateUrl: './compact-file.component.html',
  styleUrls: ['./compact-file.component.scss']
})
export class CompactFileComponent implements OnInit {

  @Input('data')
  file: FileEntity;
  
  constructor(private dialog : MatDialog) { 
  }

  ngOnInit() {
    if(this.file.isOpen == true){
      this.openDialog();
    }
  }

  openDialog(){

    const opts = new MatDialogConfig();
  
    opts.width = "600px";
    opts.height = "600px";

    opts.data = this.file;


    const dialogRef = this.dialog.open(FullFileComponent, opts);

    dialogRef.afterOpen().subscribe(
      data => console.log("opened successfully")
    );
    dialogRef.updatePosition(opts.position);

    dialogRef.afterClosed().subscribe(
      resutl => {
        console.log("The dialog was closed!!");
      }
    );
  }

}
