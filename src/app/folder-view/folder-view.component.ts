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

  public showMode: string = 'compact';

  constructor(private fileService: FileService) {
    this.fileService.showMode.subscribe(value => {
      this.showMode = value.toString();
    });
  }

  ngOnInit() {}

  openFolder() {
    console.log('ppp');

    this.fileService.navigateTo(this.folder);
  }
}
