import { list } from '@app/animation';
import {
  MatDialog,
  MatDialogClose,
  MatDialogConfig
} from '@angular/material/dialog';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  Renderer2,
  ElementRef
} from '@angular/core';
import { FullFileComponent } from '@app/full-file/full-file.component';
import { FileEntity } from '@app/file';
import { ConstService } from '@app/Services/const.service';
import { FileService } from '@app/Services/file.service';
import { PathClass } from '@app/PathClass';

@Component({
  selector: 'app-compact-file',
  templateUrl: './compact-file.component.html',
  styleUrls: ['./compact-file.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class CompactFileComponent implements OnInit {
  @Input('value')
  file: FileEntity;

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.file.selected === true)
      this.openFullFile();
  }
  public viewMode: string = 'compact';
  public mouseOn: Boolean = false;
  private isSingle: Boolean = true;

  @Output()
  deleted: EventEmitter<FileEntity> = new EventEmitter<FileEntity>();

  constructor(
    private dialog: MatDialog,
    public consts: ConstService,
    private fileService: FileService,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.viewMode = fileService.initViewMode();

    this.fileService.viewMode.subscribe(value => {
      this.viewMode = value;
    });
  }

  ngOnInit() {
    // if (this.file.name === 'foot.txt') this.openFullFile();
  }

  openFullFile() {
    const opts = new MatDialogConfig();

    opts.width = '600px';
    opts.height = '300px';

    opts.data = this.file;

    const dialogRef = this.dialog.open(FullFileComponent, opts);

    dialogRef.afterOpen().subscribe(data => console.log('opened successfully'));
    dialogRef.updatePosition(opts.position);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed!!', result);
      if (result.type === 'delete') {
        this.deleted.emit(this.file);
      }
    });
  }
  select() {
    this.fileService.selectedFile.next(this.file.name);
  }

  hoverOn() {
    this.mouseOn = true;
  }
  hoverOff() {
    this.mouseOn = false;
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.fileService.whereClickIs.next('outSide');
      // console.log('outSide');
    } else {
      this.fileService.whereClickIs.next('inSide');
      // console.log('inSide');
    }
  }

  examineOpenFullFile() {
    this.isSingle = false;
    this.openFullFile();
  }

  examineSelect() {
    this.isSingle = true;
    setTimeout(() => {
      if (this.isSingle) {
        this.select();
      }
    }, 300);
  }
}
