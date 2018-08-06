import { Component, OnInit, Input } from "@angular/core";
import { UploadFile, humanizeBytes } from "ngx-uploader";

@Component({
  selector: "app-upload-item",
  templateUrl: "./upload-item.component.html",
  styleUrls: ["./upload-item.component.scss"]
})
export class UploadItemComponent implements OnInit {
  humanizeBytes: Function;
  constructor() {
    this.humanizeBytes = humanizeBytes;
  }

  @Input() file: UploadFile;

  humanSize: string;
  ngOnInit() {
    this.humanSize = humanizeBytes(this.file.size);
  }
}
