import { Component, OnInit } from '@angular/core';
import { FileEntity } from '@app/file';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {

  constructor() { }

  files:  FileEntity[] = [
    {
      fileName : "test",
      fileExtension : "txt",
    },
    {
      fileName : "test2",
      fileExtension : "txt",
    },
    {
      fileName : "test3",
      fileExtension : "cpp",
    },
    {
      fileName : "test4",
      fileExtension : "jpg",
    },
    {
      fileName : "test5",
      fileExtension : "dir",
    },
    {
      fileName : "test4",
      fileExtension : "jpg",
    },
    {
      fileName : "test5",
      fileExtension : "dir",
    },
    {
      fileName : "test",
      fileExtension : "txt",
    },
    {
      fileName : "test2",
      fileExtension : "txt",
    },
    {
      fileName : "test3",
      fileExtension : "cpp",
    }
  ];

  ngOnInit() {
  }

}
