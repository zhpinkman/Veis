import { FileEntity } from './../file';
import { FileService } from './../Services/file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(private fileService: FileService) {}

  public showMode: string = 'compact';

  changeShowMode() {
    if (this.showMode == 'compact') this.showMode = 'list';
    else this.showMode = 'compact';
    this.fileService.showMode.next(this.showMode);
  }

  ngOnInit() {}
}
