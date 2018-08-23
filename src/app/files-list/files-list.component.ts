import { ConstService } from '@app/Services/const.service';
import { PathClass } from '@app/PathClass';
import { FileEntity } from '@app/file';
import { UtilitiesService } from '@app/Services/utilities.service';
import { FileService } from '@app/Services/file.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { list, shake, compact } from '@app/animation';
import { DragulaService } from 'ng2-dragula';
import { CompactFileComponent } from '@app/compact-file/compact-file.component';

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
  public sortedBy: string;
  public nameOrder: Boolean = true;
  public sizeOrder: Boolean = true;
  public order: Boolean = true;
  public filesAroundClick: Array<string> = [];
  objectKeys = Object.keys;

  @ViewChildren(CompactFileComponent)
  entities: QueryList<CompactFileComponent>;

  constructor(
    private fileService: FileService,
    private Aroute: ActivatedRoute,
    private utils: UtilitiesService,
    public consts: ConstService,
    private dragulaService: DragulaService
  ) {
    this.dragulaService.createGroup('allFiles', {});
    this.fileService.outSideElement.subscribe(element => {
      console.log('one Click recieved!!');
      this.filesAroundClick.push(element.toString());
      if (this.filesAroundClick.length === this.files.length) {
        console.log('click compeleted');
        let outSideClicks: number = 0;
        this.filesAroundClick.forEach(file => {
          if (file === 'outSide') outSideClicks++;
        });
        console.log(outSideClicks);
        if (outSideClicks === this.files.length) this.clearSelectedFiles();

        this.filesAroundClick = [];
      }
    });

    utils.setTitle('Your Files');

    fileService.select.subscribe(value => {
      console.log(value);
      this.addToList(value.toString());
      this.fileService.selectedFiles = this.selectedFilesIndex;
      this.fileService.allFiles = this.files;
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

  clearSelectedFiles() {
    this.selectedFilesIndex = [];
    this.files.forEach(file => (file.selected = false));
  }

  addToList(value: string) {
    let index: number;
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].name === value) {
        index = i;
      }
    }
    // console.log(index);
    for (let i = 0; i < this.selectedFilesIndex.length; i++) {
      if (this.selectedFilesIndex[i] === index) {
        // console.log('removed');
        this.selectedFilesIndex.splice(i, 1);
        this.files[index].selected = false;
        return;
      }
    }
    // console.log('added');
    this.selectedFilesIndex.push(index);
    this.files[index].selected = true;
  }

  selectedFilesIndex = new Array<number>();
  files = new Array<FileEntity>();
  folders = new Array<PathClass>();

  getFilesList() {
    this.fileService.getFiles().subscribe(data => {
      // console.log('wewe');
      this.files = data.list;
      this.folders.splice(0, this.folders.length);

      const folders = this.files.filter(val => val.type === 'dir').map(dir => ({
        ...dir,
        path: dir.path.substring(
          dir.path.indexOf('/', 1) + 1,
          dir.path.length - 1
        )
      }));
      this.files = this.files.filter(val => val.type !== 'dir');
      // console.log(folders);
      // console.log(this.fileService.currentPath);
      folders.forEach(dir => {
        // const splitedPath = dir.path.split('/');
        let folder = new PathClass(dir.name, this.fileService.currentPath);
        this.folders.push(folder);
      });

      // console.log(data);
    });
  }

  deleteFromList(event) {
    // console.log(event);
    let index = this.files.findIndex(f => f.id == event.id);
    this.files.splice(index, 1);
  }

  checkSelect(file: FileEntity) {
    if (file.selected == true) return 'shaking';
    else return 'normal';
  }
  ngOnInit() {}

  sortByName() {
    this.sortedBy = 'name';
    this.nameOrder = !this.nameOrder;
    this.order = this.nameOrder;
  }
  sortBySize() {
    this.sortedBy = 'size';
    this.sizeOrder = !this.sizeOrder;
    this.order = this.sizeOrder;
  }

  isInRoot() {
    if (this.fileService.currentPath.pathToString() === '') return true;
    else return false;
  }
}
