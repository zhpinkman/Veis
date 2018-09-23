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
import { FormControl, Validators, Form, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

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
    this.searchControl = new FormControl();
  }
  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(change => {
        console.log('change: ', change);
        if (change == '') this.fileService.searchMode = false;
        else {
          this.fileService.searchMode = true;
          this.fileService.searchFile(change).subscribe(files => {
            this.fileService.searchedFiles = files;
            if (files.size == 0) this.fileService.searchMode = false;
            console.log('searched files: ', this.fileService.searchedFiles);
          });
        }
      });
  }
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
  showSearchInput: Boolean = false;
  searchedText: String;

  submitCopy() {
    this.fileService.copyOrCut = 'copy';
    this.fileService.pasteMode = true;
    this.createCopiedFiles();
  }

  submitCut() {
    this.fileService.copyOrCut = 'cut';
    this.fileService.pasteMode = true;
    this.createCopiedFiles();
  }

  searchControl: FormControl;
  submitSearch() {
    this.showSearchInput = true;
  }

  submitCancelSearch() {
    if (this.showSearchInput) this.searchedText = '';
    this.showSearchInput = false;
    this.fileService.searchMode = false;
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
    // this.breadcrumbs.reverse();
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
