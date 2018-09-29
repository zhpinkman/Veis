import { Component, OnInit } from '@angular/core';
import { FileService } from '@app/Services/file.service';
import { FileEntity } from '@app/file';
import { PathClass } from '@app/PathClass';

@Component({
  selector: 'app-search-files',
  templateUrl: './search-files.component.html',
  styleUrls: ['./search-files.component.scss']
})
export class SearchFilesComponent implements OnInit {
  viewMode: string = 'compact';
  files = new Array<FileEntity>();
  folders: { pathClass: PathClass; origFolder: FileEntity }[] = [];
  selectedFilesIndex = new Array<number>();
  public filesAroundClick: Array<string> = [];

  constructor(public fileService: FileService) {
    this.fileService.inSearchMode.subscribe(mode => {
      if (mode == true) this.getFilesAndFolders();
      console.log('searching');
    });
    this.viewMode = fileService.initViewMode();
    this.fileService.updateSeachedFiles.subscribe(_ => {
      this.getFilesAndFolders();
    });
    this.fileService.whereClickIs.subscribe(element => {
      // console.log('one Click recieved!!');
      this.filesAroundClick.push(element);
      if (this.filesAroundClick.length === this.files.length) {
        // console.log('click compeleted');
        let outSideClicks: number = 0;
        this.filesAroundClick.forEach(file => {
          if (file === 'outSide') outSideClicks++;
        });
        // console.log(outSideClicks);
        if (outSideClicks === this.files.length) this.clearSelectedFiles();

        this.filesAroundClick = [];
      }
    });
    fileService.selectedFile.subscribe(value => {
      console.log(value);
      this.addToList(value.name);
      // console.log('value', value);
      if (this.fileService.pasteMode) {
        // console.log('bool', this.fileService.copiedFiles.includes(value));
        if (
          this.fileService.copiedFiles.findIndex(k => k.name == value.name) ==
          -1
        ) {
          // console.log('copyfiles', this.fileService.copiedFiles);
          this.fileService.copiedFiles.push(value);
        }
        // this.fileService.refreshPage.next();
        console.log('fileList: ', this.fileService.copiedFiles);
      }
      this.fileService.selectedFiles = this.selectedFilesIndex;
      this.fileService.allFiles = this.files;
      this.fileService.OnselectMode.next(this.selectedFilesIndex.length);
    });
    fileService.viewMode.subscribe(value => {
      this.viewMode = value;
    });
  }
  clearFilesAndFolders() {
    this.files = [];
    this.folders = [];
  }

  clearSelectedFiles() {
    this.selectedFilesIndex = [];
    this.files.forEach(file => (file.selected = false));
    this.fileService.OnselectMode.next(null);
  }

  ngOnInit() {}

  addToList(value: string) {
    let index: number;
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].name === value) {
        index = i;
      }
    }
    // console.log(index);
    for (let i = 0; i < this.selectedFilesIndex.length; i++) {
      if (this.selectedFilesIndex[i] === index) {
        // console.log('removed');
        this.selectedFilesIndex.splice(i, 1);
        this.files[index].selected = false;
        return;
      }
    }
    // console.log('added');
    this.selectedFilesIndex.push(index);
    this.files[index].selected = true;
  }

  isInPasteMode() {
    if (this.fileService.pasteMode) return true;
    else return false;
  }
  getFilesAndFolders() {
    this.files = this.fileService.searchedFiles;
    this.folders.splice(0, this.folders.length);

    const folders = this.files.filter(val => val.type === 'dir').map(dir => ({
      ...dir
    }));
    this.files = this.files.filter(val => val.type !== 'dir');
    folders.forEach(dir => {
      let folder = new PathClass(dir.name, this.fileService.currentPath);
      this.folders.push({ pathClass: folder, origFolder: dir });
    });

    this.files.forEach(file => {
      if (file.name.includes('.'))
        file.fileExtension = file.name.substr(file.name.lastIndexOf('.') + 1);
    });
  }

  deleteFromList(event) {
    let index = this.files.findIndex(f => f.id == event.id);
    this.files.splice(index, 1);
  }
}
