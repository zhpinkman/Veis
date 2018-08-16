import { MatDialog, MatDialogConfig, DialogPosition } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/Services/auth.service';
import { Router, Params } from '@angular/router';
import { NewFolderComponent } from '@app/new-folder/new-folder.component';
import { FileService } from '@app/Services/file.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  UrlSegment
} from '@angular/router';
import { PathClass } from '@app/PathClass';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
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
  }
  ngOnInit() {
    this.makeBreadCrumbs();
  }
  openDialog(event): void {
    const opts = new MatDialogConfig();
    console.log(event.x + ' , ' + event.y);
    const dialogPosition: DialogPosition = {
      top: '8%',
      right: '8%'
    };
    opts.width = '300px';
    opts.height = '200px';

    opts.position = dialogPosition;

    const dialogRef = this.dialog.open(NewFolderComponent, opts);

    dialogRef.afterOpen().subscribe(data => console.log('opened successfully'));
    dialogRef.updatePosition(opts.position);

    dialogRef.afterClosed().subscribe(resutl => {
      console.log('The dialog was closed!!');
    });
  }
  public showMode: string = 'compact';
  public selectModeToolbar: Boolean = false;
  public showListIcon: Boolean = false;
  changeShowMode() {
    if (this.showMode == 'compact') this.showMode = 'list';
    else this.showMode = 'compact';
    this.fileService.showMode.next(this.showMode);
    this.showListIcon = !this.showListIcon;
  }
  breadcrumbs = [];
  makeBreadCrumbs() {
    let currentPath: PathClass = this.fileService.currentPath;
    console.log(currentPath.name);
    this.breadcrumbs = [];
    while (currentPath.getParent() != null) {
      this.breadcrumbs.push(currentPath);
      currentPath = currentPath.getParent();
    }
    this.breadcrumbs.reverse();
  }
  navigateTo(path: PathClass) {
    this.fileService.currentPath = path;
    // console.log(this.fileService.currentPath.name);
    this.makeBreadCrumbs();
  }
}
