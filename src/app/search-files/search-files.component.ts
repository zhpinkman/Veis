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
  viewMode: String = 'compact';
  files = new Array<FileEntity>();
  folders = new Array<PathClass>();
  constructor(public fileService: FileService) {
    this.fileService.inSearchMode.subscribe(mode => {
      if (mode == true) this.getFilesAndFolders();
      console.log('searching');
    });
    this.viewMode = fileService.initViewMode();
    this.fileService.updateSeachedFiles.subscribe(data => {
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
      ...dir,
      path: dir.path.substring(
        dir.path.indexOf('/', 1) + 1,
        dir.path.length - 1
      )
    }));
    this.files = this.files.filter(val => val.type !== 'dir');
    folders.forEach(dir => {
      let folder = new PathClass(dir.name, this.fileService.currentPath);
      this.folders.push(folder);
    });

    this.files.forEach(file => {
      if (file.name.includes('.'))
        file.fileExtension = file.name.substr(file.name.lastIndexOf('.') + 1);
    });
    console.log('zzzz');

    console.log(this.files);
    console.log(this.folders);
    console.log('tttt');
  }
}
