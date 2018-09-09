import { FileService } from '@app/Services/file.service';
import { PathClass } from './../PathClass';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-folder-view',
  templateUrl: './folder-view.component.html',
  styleUrls: ['./folder-view.component.scss']
})
export class FolderViewComponent implements OnInit {
  @Input('data')
  folder: PathClass;

  public viewMode: string = 'compact';

  constructor(private fileService: FileService) {
    this.viewMode = fileService.initViewMode();
    this.fileService.viewMode.subscribe(value => {
      this.viewMode = value;
    });
  }

  ngOnInit() {}

  openFolder() {
    // console.log(this.folder);
    this.fileService.navigateTo(this.folder);
  }
}
