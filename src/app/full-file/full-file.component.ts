import { humanizeBytes } from "ngx-uploader";
import { Component, OnInit, Inject, Pipe, PipeTransform } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FileEntity } from "@app/file";
import { ConstService } from "@app/Services/const.service";

@Component({
  selector: "app-full-file",
  templateUrl: "./full-file.component.html",
  styleUrls: ["./full-file.component.scss"]
})
export class FullFileComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FileEntity,
    public consts: ConstService
  ) {}

  ngOnInit() {}
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
