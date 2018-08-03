import { Component, OnInit } from '@angular/core';
import { FileService } from '@app/file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  constructor(private fileService : FileService) { }

  form : FormData

  ngOnInit() {
    this.form = new FormData();
  }

  addFile(e) {
    this.form.append('file', e.target.files[0])
  }

  sendFile() {
    this.fileService.makeRequest(this.form);
  }

  disable(){
    
  }
}
