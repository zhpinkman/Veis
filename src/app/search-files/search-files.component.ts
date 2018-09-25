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
  constructor(public fileService: FileService) {
    this.fileService.inSearchMode.subscribe(mode => {
      if (mode == true) this.getFilesAndFolders();
      console.log('searching');
    });
    this.viewMode = fileService.initViewMode();
    this.fileService.updateSeachedFiles.subscribe(_ => {
      this.getFilesAndFolders();
    });
  }

  ngOnInit() {}

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
}
