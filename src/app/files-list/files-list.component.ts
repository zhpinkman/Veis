import { FileEntity } from '@app/file';
import { MatInputModule } from '@angular/material/input';
import { list, shake } from './../animation';
import { UtilitiesService } from '@app/Services/utilities.service';
import { FileService } from '@app/Services/file.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss'],
  animations: [list, shake]
})
export class FilesListComponent implements OnInit {
  public id: string;
  public pathParent: string;
  public showMode: string = 'compact';

  constructor(
    private fileService: FileService,
    private Aroute: ActivatedRoute,
    private utils: UtilitiesService
  ) {
    utils.setTitle('Your Files');
    fileService.mysubject.subscribe(value => {
      console.log(value);
      this.addToList(value.toString());
      this.fileService.selectMode.next(this.selectedFilesIndex.length);
    });

    fileService.showMode.subscribe(value => {
      this.showMode = value.toString();
    });
  }

  addToList(value: string) {
    let index: number;
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].name === value) {
        index = i;
      }
    }
    console.log(index);
    for (let i = 0; i < this.selectedFilesIndex.length; i++) {
      if (this.selectedFilesIndex[i] === index) {
        console.log('removed');
        this.selectedFilesIndex.splice(i, 1);
        this.files[index].selected = false;
        return;
      }
    }
    console.log('added');
    this.selectedFilesIndex.push(index);
    this.files[index].selected = true;
  }

  selectedFilesIndex = new Array<number>();
  files = new Array<FileEntity>();

  ngOnInit() {
    this.getFilesList();
  }

  getFilesList() {
    this.fileService.getFiles().subscribe(data => {
      this.files = data.list;

      ////////////////////////////////////////////////

      for (var i = 0; i < this.files.length; i++) {
        this.files[i].id = this.files[i].path;
      }

      this.pathParent = this.Aroute.snapshot.paramMap.get('path');
      this.id = this.Aroute.snapshot.paramMap.get('id');
      console.log(this.pathParent);
      console.log(this.id);
      console.log(this.files.length);
      let fullName = '/' + this.pathParent + '/' + this.id;
      for (var i = 0; i < this.files.length; i++) {
        console.log(this.files[i].id);
        if (this.files[i].id == fullName) {
          this.files[i].isOpen = true;
        }
      }

      ////////////////////////////////

      console.log(data);
    });
  }

  deleteFromList(event) {
    let index = this.files.findIndex(f => f.id == event.id);
    this.files.splice(index, 1);
  }

  checkSelect(file: FileEntity) {
    if (file.selected == true) return 'shaking';
    else return 'normal';
  }
}
