import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class ConstService {
  constructor() {}

  icons = {
    txt: " fa-file text-info ",
    jpg: " text-warning fa-image ",
    dir: " fa-folder text-primary ",
    cpp: " fa-code text-danger ",
    pdf: " fa-file-pdf-o text-danger "
  };
}
