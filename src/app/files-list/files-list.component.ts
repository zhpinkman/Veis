import { PathClass } from '@app/PathClass';
import { FileEntity } from '@app/file';
import { UtilitiesService } from '@app/Services/utilities.service';
import { FileService } from '@app/Services/file.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { list, shake, compact } from '@app/animation';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss'],
  animations: [list, shake, compact]
})
export class FilesListComponent implements OnInit {
  public id: string;
  public pathParent: string;
  public showMode: string = 'list';

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

  getFilesList() {
    this.fileService.getFiles().subscribe(data => {
      console.log('wewe');
      this.files = data.list;
      this.folders.splice(0, this.folders.length);
      // console.log(this.files.length);
      // this.files.forEach(val => {
      //   if (val.type == 'dir') {
      //     // console.log(val.path + ' , ' + val.name);
      //     let path = val.path.split('/');
      //     // console.log(path.length);
      //     let folder = new PathClass(path[2]);
      //     path.forEach(p => {
      //       folder = new PathClass(p, folder);
      //     });
      //     // console.log(folder);
      //     this.folders.push(folder);
      //   }
      // });

      const folders = this.files.filter(val => val.type === 'dir').map(dir => ({
        ...dir,
        path: dir.path.substring(
          dir.path.indexOf('/', 1) + 1,
          dir.path.length - 1
        )
      }));
      this.files = this.files.filter(val => val.type !== 'dir');
      console.log(folders);
      console.log(this.fileService.currentPath);
      folders.forEach(dir => {
        // const splitedPath = dir.path.split('/');
        let folder = new PathClass(dir.name, this.fileService.currentPath);
        this.folders.push(folder);
      });

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
    console.log(event);
    let index = this.files.findIndex(f => f.id == event.id);
    this.files.splice(index, 1);
  }

  checkSelect(file: FileEntity) {
    if (file.selected == true) return 'shaking';
    else return 'normal';
  }
  ngOnInit() {}
}
