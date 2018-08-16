import { PathClass } from '@app/PathClass';
import { FileEntity } from '@app/file';
import { UtilitiesService } from '@app/Services/utilities.service';
import { FileService } from '@app/Services/file.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { list, shake } from '@app/animation';

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
    fileService.select.subscribe(value => {
      console.log(value);
      this.addToList(value.toString());
      this.fileService.selectMode.next(this.selectedFilesIndex.length);
    });

    fileService.showMode.subscribe(value => {
      this.showMode = value.toString();
    });

    fileService.newFilesComming.subscribe(value => {
      this.getFilesList();
    });

    fileService.loadFiles.subscribe(value => {
      this.getFilesList();
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
  folders = new Array<PathClass>();

  ngOnInit() {
    // this.getFilesList();
  }

  getFilesList() {
    this.fileService.getFiles().subscribe(data => {
      this.files = data.list;
      this.folders.splice(0, this.folders.length);
      // console.log(this.files.length);
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].type == 'dir') {
          // console.log(this.files[i].path + ' , ' + this.files[i].name);
          let path = this.files[i].path.split('/');
          // console.log(path.length);
          let folder = new PathClass(path[2]);
          for (let i = 3; i < path.length; i++) {
            folder = new PathClass(path[i], folder);
          }
          // console.log(folder);
          this.folders.push(folder);
        }
      }

      ////////////////////////////////////////////////

      // for (var i = 0; i < this.files.length; i++) {
      //   this.files[i].id = this.files[i].path;
      // }

      // this.pathParent = this.Aroute.snapshot.paramMap.get('path');
      // this.id = this.Aroute.snapshot.paramMap.get('id');
      // console.log(this.pathParent);
      // console.log(this.id);
      // console.log(this.files.length);
      // let fullName = '/' + this.pathParent + '/' + this.id;
      // for (var i = 0; i < this.files.length; i++) {
      //   console.log(this.files[i].id);
      //   if (this.files[i].id == fullName) {
      //     this.files[i].isOpen = true;
      //   }
      // }

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
