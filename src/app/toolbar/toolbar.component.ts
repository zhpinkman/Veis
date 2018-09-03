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
    console.log('size of op: ', value.length);
    value.forEach(val => {
      this.fileService.copiedFiles.push(data[val]);
    });
  }

  submitPaste() {
    this.fileService.filePasted = false;
    console.log(this.fileService.oldPathes);
    this.fileService.copiedFiles.forEach(cf => {
      console.log('After: ', this.oldPath, 'N: ', name);
      let request = new CopyRequest();
      this.oldPath = cf.path;
      let index = this.oldPath.indexOf('/', 1);
      this.oldPath = this.oldPath.substring(index);
      request.oldPath = this.oldPath;
      request.newPath = this.fileService.currentPath.pathToString();
      if (this.fileService.copyOrCut === 'copy') {
        this.fileService.copyFile(request).subscribe(
          data => {
            this.fileService.refreshPage.next();
            this.utils.success('موفقیت', 'کپی با موفقیت انجام شد');
          },
          error => {
            this.utils.error('خطا...', 'کپی با خطا مواجه شد!');
          }
        );
      } else {
        this.fileService.moveFile(request).subscribe(
          data => {
            this.fileService.refreshPage.next();
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
    this.fileService.OnselectMode.next(null);
    this.fileService.copiedFiles = [];
  }

  submitCancel() {
    this.selectModeToolbar = false;
    this.fileService.filePasted = false;
    this.fileService.selectedFiles = [];
    this.fileService.copyOrCut = null;
    this.fileService.OnselectMode.next(null);
    this.fileService.copiedFiles = [];
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
    // console.log(currentPath.name);
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
  initialViewModeIcon() {
    if (this.viewMode === 'compact') this.isGridView = true;
    else this.isGridView = false;
  }
}
