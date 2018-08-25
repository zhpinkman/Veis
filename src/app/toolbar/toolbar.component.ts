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
    this.showMode = fileService.initViewMode();

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
    const dialogPosition: DialogPosition = {
      top: '8%',
      right: '8%'
    };
    opts.width = '300px';
    opts.height = '200px';

    opts.position = dialogPosition;

    const dialogRef = this.dialog.open(NewFolderComponent, opts);

    dialogRef.updatePosition(opts.position);

    dialogRef.afterClosed().subscribe(resutl => {});
  }
  showMode: string = 'compact';
  selectModeToolbar: Boolean = false;
  showListIcon: Boolean = false;
  oldPath: String = '';

  submitCopy() {
    this.fileService.copyOrCut = 'copy';
    this.fileService.pasteMode = true;
    this.createOldPathesFromSelectedFiles();
  }

  submitCut() {
    this.fileService.copyOrCut = 'cut';
    this.fileService.pasteMode = true;
    this.createOldPathesFromSelectedFiles();
  }

  createOldPathesFromSelectedFiles() {
    let oldPathes = [];
    let data = this.fileService.allFiles;
    let value = this.fileService.selectedFiles;
    console.log('size of op: ', value.length);
    value.forEach(val => {
      this.oldPath = data[val].path;
      let index = this.oldPath.indexOf('/', 1);
      this.oldPath = this.oldPath.substring(index);
      oldPathes.push(this.oldPath);
    });
    console.log('oldPathes info= ', oldPathes);
    console.log('size of oldpathes: ', oldPathes.length);
    this.fileService.oldPathes = oldPathes;
  }

  submitPaste() {
    this.fileService.pasteMode = false;
    console.log(this.fileService.oldPathes);
    this.fileService.oldPathes.forEach(op => {
      console.log('After: ', this.oldPath, 'N: ', name);
      let request = new CopyRequest();
      request.oldPath = op;
      request.newPath = this.fileService.currentPath.pathToString();
      if (this.fileService.copyOrCut === 'copy') {
        this.fileService.copyFile(request).subscribe(
          data => {
            this.utils.success('موفقیت', 'کپی با موفقیت انجام شد');
          },
          error => {
            this.utils.error('خطا...', 'کپی با خطا مواجه شد!');
          }
        );
      } else {
        this.fileService.moveFile(request).subscribe(
          data => {
            this.utils.success('موفقیت', 'کات با موفقیت انجام شد');
          },
          error => {
            this.utils.error('خطا...', 'کات با خطا مواجه شد');
          }
        );
      }
    });

    this.fileService.selectedFiles = [];
    this.fileService.copyOrCut = null;
    this.selectModeToolbar = false;
  }
  submitCancel() {
    this.selectModeToolbar = false;
    this.fileService.pasteMode = false;
    this.fileService.selectedFiles = [];
    this.fileService.copyOrCut = null;
  }
  changeShowMode() {
    if (this.showMode == 'compact') this.showMode = 'list';
    else this.showMode = 'compact';
    localStorage.setItem('viewMode', this.showMode);
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
