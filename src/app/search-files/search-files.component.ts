import { Component, OnInit } from '@angular/core';
import { FileService } from '@app/Services/file.service';

@Component({
  selector: 'app-search-files',
  templateUrl: './search-files.component.html',
  styleUrls: ['./search-files.component.scss']
})
export class SearchFilesComponent implements OnInit {
  viewMode: String = 'compact';
  constructor(public fileService: FileService) {
    this.viewMode = fileService.initViewMode();
  }

  ngOnInit() {}

  isInPasteMode() {
    if (this.fileService.pasteMode) return true;
    else return false;
  }
}
