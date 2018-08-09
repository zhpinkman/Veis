import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ConstService {
  constructor() {}

  icons = {
    'text/plain': ' fa-file text-info ',
    'image/jpeg': ' text-warning fa-image ',
    dir: ' fa-folder text-primary ',
    'application/javascript': ' fa-code text-danger ',
    'text/html': ' fa-html5 text-danger ',
    'application/pdf': ' fa-file-pdf-o text-danger '
  };
}
