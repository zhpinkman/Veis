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
  constructor() {}

  createFolderForm: FormGroup;
  folderName: FormControl;

  ngOnInit() {
    this.folderName = new FormControl('', Validators.required);
    this.createFolderForm = new FormGroup({
      folderName: this.folderName
    });
  }

  createDir() {
    console.log(this.folderName.value);
    console.log('created!!');
  }
}
