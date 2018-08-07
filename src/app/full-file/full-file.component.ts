import { humanizeBytes } from "ngx-uploader";
import { Component, OnInit, Inject, Pipe, PipeTransform } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FileEntity } from "@app/file";

@Component({
  selector: "app-full-file",
  templateUrl: "./full-file.component.html",
  styleUrls: ["./full-file.component.scss"]
})
export class FullFileComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: FileEntity) { }

  ngOnInit() { }
  showEditName: boolean = false;

  icons = {
    txt: " fa-file text-info ",
    jpg: " text-warning fa-image ",
    dir: " fa-folder text-primary ",
    cpp: " fa-code text-danger ",
    pdf: " fa-file-pdf-o text-danger "
  };
  submit() {
    this.showEditName = !this.showEditName;
  }
}

@Pipe({ name: "size" })
export class SizeHandler implements PipeTransform {
  humanizeBytes: Function;
  constructor() {
    this.humanizeBytes = humanizeBytes;
  }
  transform(value: number): string {
    return this.humanizeBytes(value);
  }


}
