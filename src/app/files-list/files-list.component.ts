import { FileService } from '@app/Services/file.service';
import { Component, OnInit } from '@angular/core';
import { FileEntity } from '@app/file';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {


  public id: string;
  public path: string;

  constructor(private fileService: FileService, private Aroute: ActivatedRoute) { 
    for(var i = 0; i < this.files.length; i++){
      this.files[i].Id =this.files[i].filePath + this.files[i].fileName + "." + this.files[i].fileExtension;
    }
  }

  files:  FileEntity[] = [
    {
      fileName : "test",
      fileExtension : "txt",
      fileSize: 200,
      filePath: "",
      Id : "",
      isOpen: false
    },
    {
      fileName : "test2",
      fileExtension : "txt",
      fileSize: 100,
      filePath: "",
      Id : "",
      isOpen: false
    },
    {
      fileName : "test3",
      fileExtension : "cpp",
      fileSize: 100,
      filePath: "",
      Id : "",
      isOpen: false
    },
    {
      fileName : "test4",
      fileExtension : "jpg",
      fileSize: 100,
      filePath: "",
      Id : "",
      isOpen: false
    },
    {
      fileName : "test5",
      fileExtension : "pdf",
      fileSize: 100,
      filePath: "",
      Id : "",
      isOpen: false
    }
    // {
    //   fileName : "test",
    //   fileExtension : "txt",
    //   fileSize: 100,
    //   filePath: "",
    //   Id : "",
    //   isOpen: false
    // },
    // {
    //   fileName : "test2",
    //   fileExtension : "txt",
    //   fileSize: 100,
    //   filePath: "",
    //   Id : "",
    //   isOpen: false
    // },
    // {
    //   fileName : "test3",
    //   fileExtension : "cpp",
    //   fileSize: 100,
    //   filePath: "",
    //   Id : "",
    //   isOpen: false
    // },
    // {
    //   fileName : "test4",
    //   fileExtension : "jpg",
    //   fileSize: 100,
    //   filePath: "",
    //   Id : "",
    //   isOpen: false
    // },
    // {
    //   fileName : "test",
    //   fileExtension : "txt",
    //   fileSize: 100,
    //   filePath: "",
    //   Id : "",
    //   isOpen: false
    // },
    // {
    //   fileName : "test2",
    //   fileExtension : "txt",
    //   fileSize: 100,
    //   filePath: "",
    //   Id : "",
    //   isOpen: false
    // },
    // {
    //   fileName : "test3",
    //   fileExtension : "cpp",
    //   fileSize: 100,
    //   filePath: "",
    //   Id : "",
    //   isOpen: false
    // },
    // {
    //   fileName : "test4",
    //   fileExtension : "jpg",
    //   fileSize: 100,
    //   filePath: "",
    //   Id : "",
    //   isOpen: false
    // },
    // {
    //   fileName : "test",
    //   fileExtension : "txt",
    //   fileSize: 100,
    //   filePath: "",
    //   Id : "",
    //   isOpen: false
    // },
    // {
    //   fileName : "test2",
    //   fileExtension : "txt",
    //   fileSize: 100,
    //   filePath: "",
    //   Id : "",
    //   isOpen: false
    // },
    // {
    //   fileName : "test3",
    //   fileExtension : "cpp",
    //   fileSize: 100,
    //   filePath: "",
    //   Id : "",
    //   isOpen: false
    // }
  ];

  ngOnInit() {
    this.id = this.Aroute.snapshot.paramMap.get('id');
    // this.path = this.Aroute.snapshot.paramMap.get('path');
    console.log(this.id);
    for(var i = 0; i < this.files.length; i++){
      if(this.files[i].Id == this.id){
        this.files[i].isOpen = true;
        console.log("zzz");
        
      }
        
    }
    
    // console.log(this.path);
    
  }

  getFilesList(){
    this.fileService.getFiles().subscribe(
      data => {
        this.files = data;
      }
    );
  }

}
