import { Subject } from 'rxjs/internal/Subject';
import { FileService } from '@app/Services/file.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormControlDirective,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.scss']
})
export class NewFolderComponent implements OnInit {
  constructor(private fileService: FileService) {}

  createFolderForm: FormGroup;
  folderName: FormControl;

  ngOnInit() {
    this.folderName = new FormControl('', Validators.required);
    this.createFolderForm = new FormGroup({
      folderName: this.folderName
    });
  }

  createDir() {
    // console.log(this.folderName.value);
    this.fileService.mkDir(this.folderName.value).subscribe(val => {
      // console.log('created!!');
      this.fileService.newFilesComming.next();
    });
  }
}
