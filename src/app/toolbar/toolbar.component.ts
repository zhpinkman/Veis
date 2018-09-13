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
import { UtilitiesService } from '@app/Services/utilities.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [flyInOut]
})
export class ToolbarComponent implements OnInit {
  constructor(
    public fileService: FileService,
    private dialog: MatDialog,
    private router: Router,
    private utils: UtilitiesService
  ) {
    this.viewMode = fileService.initViewMode();
    this.initialViewModeIcon();
    this.fileService.OnselectMode.subscribe(data => {
      if (data > 0) this.selectModeToolbar = true;
      else this.selectModeToolbar = false;
    });
    fileService.refreshPage.subscribe(value => {
      this.dialog.closeAll();
    });
    this.fileService.currentPathRefreshed.subscribe(data => {
      this.makeBreadCrumbs();
    });
  }
  ngOnInit() {}
  openDialog(event): void {
    const newFolderDialogopts = new MatDialogConfig();
    const dialogPosition: DialogPosition = {
      top: '8%',
      right: '8%'
    };
    newFolderDialogopts.width = '300px';
    newFolderDialogopts.height = '200px';

    newFolderDialogopts.position = dialogPosition;

    const dialogRef = this.dialog.open(NewFolderComponent, newFolderDialogopts);

    dialogRef.updatePosition(newFolderDialogopts.position);

    dialogRef.afterClosed().subscribe(resutl => {});
  }
  viewMode: string = 'compact';
  selectModeToolbar: Boolean = false;
  isGridView: Boolean = false;
  oldPath: String = '';

  submitCopy() {
    this.fileService.copyOrCut = 'copy';
    this.fileService.filePasted = true;
    this.createCopiedFiles();
  }

  submitCut() {
    this.fileService.copyOrCut = 'cut';
    this.fileService.filePasted = true;
    this.createCopiedFiles();
  }

  createCopiedFiles() {
    let oldPathes = [];
    let data = this.fileService.allFiles;
    let value = this.fileService.selectedFiles;
    // console.log('size of op: ', value.length);
    value.forEach(val => {
      this.fileService.copiedFiles.push(data[val]);
    });
  }

  changeviewMode() {
    if (this.viewMode == 'compact') this.viewMode = 'list';
    else this.viewMode = 'compact';
    localStorage.setItem('viewMode', this.viewMode);
    this.fileService.viewMode.next(this.viewMode);
    this.isGridView = !this.isGridView;
  }
  breadcrumbs = [];
  makeBreadCrumbs() {
    let currentPath: PathClass = this.fileService.currentPath;
    // console.log(currentPath);
    this.breadcrumbs = [];
    while (currentPath.getParent() != null) {
      this.breadcrumbs.push(currentPath);
      currentPath = currentPath.getParent();
      // console.log(currentPath.name);
    }
    this.breadcrumbs.reverse();
    this.fileService.breadcrumbs = this.breadcrumbs;
  }

  navigateTo(path: PathClass) {
    this.fileService.navigateTo(path);
    this.makeBreadCrumbs();
  }
  navigateToHome() {
    this.router.navigate(['/myfiles']);
  }
  navigateToUpload() {
    this.router.navigate(['upload']);
  }
  initialViewModeIcon() {
    if (this.viewMode === 'compact') this.isGridView = true;
    else this.isGridView = false;
  }
}
