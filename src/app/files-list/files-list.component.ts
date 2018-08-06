import { FileService } from '@app/Services/file.service';
import { Component, OnInit } from '@angular/core';
import { FileEntity } from '@app/file';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {

  constructor(private fileService: FileService) { }

  files:  FileEntity[] = [
    {
      fileName : "test",
      fileExtension : "txt",
      fileSize: 200
    },
    {
      fileName : "test2",
      fileExtension : "txt",
      fileSize: 100
    },
    {
      fileName : "test3",
      fileExtension : "cpp",
      fileSize: 100
    },
    {
      fileName : "test4",
      fileExtension : "jpg",
      fileSize: 100
    },
    {
      fileName : "test4",
      fileExtension : "jpg",
      fileSize: 100
    },
    {
      fileName : "test5",
      fileExtension : "dir",
      fileSize: 100
    },
    {
      fileName : "test",
      fileExtension : "txt",
      fileSize: 100
    },
    {
      fileName : "test2",
      fileExtension : "txt",
      fileSize: 100
    },
    {
      fileName : "test3",
      fileExtension : "cpp",
      fileSize: 100
    },
    {
      fileName : "test4",
      fileExtension : "jpg",
      fileSize: 100
    },
    {
      fileName : "test5",
      fileExtension : "dir",
      fileSize: 100
    },
    {
      fileName : "test",
      fileExtension : "txt",
      fileSize: 100
    },
    {
      fileName : "test2",
      fileExtension : "txt",
      fileSize: 100
    },
    {
      fileName : "test3",
      fileExtension : "cpp",
      fileSize: 100
    },
    {
      fileName : "test4",
      fileExtension : "jpg",
      fileSize: 100
    },
    {
      fileName : "test5",
      fileExtension : "dir",
      fileSize: 100
    },
    {
      fileName : "test",
      fileExtension : "txt",
      fileSize: 100
    },
    {
      fileName : "test2",
      fileExtension : "txt",
      fileSize: 100
    },
    {
      fileName : "test3",
      fileExtension : "cpp",
      fileSize: 100
    }
  ];

  ngOnInit() {
  }

  getFilesList(){
    this.fileService.getFiles().subscribe(
      data => {
        this.files = data;
      }
    );
  }

}
