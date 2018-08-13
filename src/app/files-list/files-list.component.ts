import { list } from './../animation';
import { UtilitiesService } from '@app/Services/utilities.service';
import { FileService } from '@app/Services/file.service';
import { Component, OnInit } from '@angular/core';
import { FileEntity } from '@app/file';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss'],
  animations: [list]
})
export class FilesListComponent implements OnInit {
  public id: string;
  public path: string;

  constructor(
    private fileService: FileService,
    private Aroute: ActivatedRoute,
    private utils: UtilitiesService
  ) {
    utils.setTitle('Your Files');
  }

  files = new Array<FileEntity>();

  ngOnInit() {
    this.getFilesList();

    for (var i = 0; i < this.files.length; i++) {
      this.files[i].id = this.files[i].path;
    }

    this.id = this.Aroute.snapshot.paramMap.get('id');
    // this.path = this.Aroute.snapshot.paramMap.get('path');
    // console.log(this.id);
    for (var i = 0; i < this.files.length; i++) {
      if (this.files[i].id == this.id) {
        this.files[i].isOpen = true;
        // console.log('zzz');
      }
    }

    // console.log(this.path);
  }

  getFilesList() {
    this.fileService.getFiles().subscribe(data => {
      this.files = data.list;
      console.log(data);
    });
  }

  deleteFromList(event) {
    let index = this.files.findIndex(f => f.id == event.id);
    this.files.splice(index, 1);
  }
}
