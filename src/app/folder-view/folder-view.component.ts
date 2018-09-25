import { FileEntity } from '@app/file';
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

  @Input('origFolder')
  origFolder: FileEntity;
  public viewMode: string = 'compact';

  constructor(private fileService: FileService) {
    this.viewMode = fileService.initViewMode();
    this.fileService.viewMode.subscribe(value => {
      this.viewMode = value;
    });
  }

  ngOnInit() {}

  openFolder() {
    let path = this.origFolder.path.toString().split('/');

    path.splice(1, 1);
    let pathClass = new PathClass(path[0]);
    for (let i = 1; i < path.length; i++) {
      path[i] = decodeURIComponent(path[i]);
      console.log(path[i]);
      pathClass = new PathClass(path[i], pathClass);
    }

    console.log(pathClass, this.origFolder.path);

    // const tempPathClass = this.origFolder.path;
    this.fileService.navigateTo(pathClass);
  }
}
