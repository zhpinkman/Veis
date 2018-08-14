import { Subject } from 'rxjs/internal/Subject';
import { FileEntity } from './../file';
import { FileService } from './../Services/file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(private fileService: FileService) {
    this.fileService.selectMode.subscribe(data => {
      if (data > 0) this.selectModeToolbar = true;
      else this.selectModeToolbar = false;
    });
  }

  public showMode: string = 'compact';
  public selectModeToolbar: Boolean = false;
  changeShowMode() {
    if (this.showMode == 'compact') this.showMode = 'list';
    else this.showMode = 'compact';
    this.fileService.showMode.next(this.showMode);
  }

  ngOnInit() {}
}
