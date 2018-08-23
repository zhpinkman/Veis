import { MatDialog, MatDialogConfig, DialogPosition } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/Services/auth.service';
import { Router, Params } from '@angular/router';
import { NewFolderComponent } from '@app/new-folder/new-folder.component';
import { FileService } from '@app/Services/file.service';
import { CopyRequest } from '@app/copyRequest';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  UrlSegment
} from '@angular/router';
import { PathClass } from '@app/PathClass';
import { Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
import { flyInOut } from '@app/animation';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [flyInOut]
})
export class ToolbarComponent implements OnInit {
  constructor(
    private fileService: FileService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.fileService.selectMode.subscribe(data => {
      if (data > 0) this.selectModeToolbar = true;
      else this.selectModeToolbar = false;
    });
    fileService.newFilesComming.subscribe(value => {
      this.dialog.closeAll();
    });
    this.fileService.loadFiles.subscribe(data => {
      this.makeBreadCrumbs();
    });
  }
  ngOnInit() {}
  openDialog(event): void {
    const opts = new MatDialogConfig();
    // console.log(event.x + ' , ' + event.y);
    const dialogPosition: DialogPosition = {
      top: '8%',
      right: '8%'
    };
    opts.width = '300px';
    opts.height = '200px';

    opts.position = dialogPosition;

    const dialogRef = this.dialog.open(NewFolderComponent, opts);

    // dialogRef.afterOpen().subscribe(data =>
    //   //  console.log('opened successfully')
    //   );
    dialogRef.updatePosition(opts.position);

    dialogRef.afterClosed().subscribe(resutl => {
      // console.log('The dialog was closed!!');
    });
  }
  public showMode: string = 'list';
  public selectModeToolbar: Boolean = false;
  public showListIcon: Boolean = false;
  public copyMode: Boolean = false;
  public cutMode: Boolean = false;
  public pasteMode: Boolean = false;
  public oldPath: String = '';

  submitCopy() {
    this.copyMode = true;
    this.pasteMode = true;
    this.fileService.pasteMode = this.pasteMode;
  }

  submitCut() {
    this.cutMode = true;
    this.pasteMode = true;
    this.fileService.pasteMode = this.pasteMode;
  }

  // public oldPathes = new Array<String>();
  public op = new Array<String>();
  submitPaste() {
    // this.selectModeToolbar = false;
    this.pasteMode = false;
    this.fileService.pasteMode = this.pasteMode;
    let oldPathes = new Array<String>();
    this.fileService.allFiles.subscribe(data => {
      this.fileService.selectedFiles.subscribe(value => {
        this.op = value as Array<String>;
        console.log('size of op: ', this.op.length);
        for (let i = 0; i < this.op.length; i++) {
          this.oldPath = data[value[i]].path;
          this.oldPath = this.oldPath.substring(1, this.oldPath.length);
          let index;
          index = this.oldPath.indexOf('/');
          this.oldPath = this.oldPath.substring(index, this.oldPath.length);
          oldPathes.push(this.oldPath);
        }
        console.log('oldPathes info= ', oldPathes);
      });
    });
    console.log('size of oldpathes: ', oldPathes.length);
    for (let i = 0; i < oldPathes.length; i++) {
      console.log('After: ', this.oldPath, 'N: ', name);
      let Request = new CopyRequest();
      Request.oldPath = oldPathes[i];
      Request.newPath = this.fileService.currentPath.pathToString();
      if (!this.copyMode) {
        this.fileService.copyFile(Request).subscribe(data => {});
      } else if (this.cutMode) {
        this.fileService.moveFile(Request).subscribe(data => {});
      }
    }
    this.fileService.selectedFiles.next(null);
    this.copyMode = false;
    this.cutMode = false;
    // this.router.navigate([this.fileService.currentPath.pathToString()]);
  }
  submitCancel() {
    this.copyMode = !this.copyMode;
    this.cutMode = !this.cutMode;
    this.selectModeToolbar = false;
    this.pasteMode = !this.pasteMode;
    this.fileService.pasteMode = this.pasteMode;
  }
  changeShowMode() {
    if (this.showMode == 'compact') this.showMode = 'list';
    else this.showMode = 'compact';
    this.fileService.showMode.next(this.showMode);
    this.showListIcon = !this.showListIcon;
  }
  breadcrumbs = [];
  makeBreadCrumbs() {
    let currentPath: PathClass = this.fileService.currentPath;
    // console.log(currentPath.name);
    this.breadcrumbs = [];
    while (currentPath.getParent() != null) {
      this.breadcrumbs.push(currentPath);
      currentPath = currentPath.getParent();
      // console.log(currentPath.name);
    }
    this.breadcrumbs.reverse();
  }

  navigateTo(path: PathClass) {
    // this.fileService.currentPath = path;
    // console.log(this.fileService.currentPath.name);
    // console.log(this.fileService.currentPath.getParent().name);
    this.fileService.navigateTo(path);
    this.makeBreadCrumbs();
  }
  navigateToHome() {
    this.router.navigate(['/myfiles']);
  }
  navigateToUpload() {
    this.router.navigate(['upload']);
  }
}
