import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ConstService {
  constructor() {}

  icons = {
    'text/plain': 'text-info fi flaticon-doc',
    'image/jpeg': ' text-warning fi flaticon-jpg ',

    dir: 'fi flaticon-folder text-primary ',
    'application/javascript': 'fi flaticon-javascript text-danger ',
    'text/html': 'fi flaticon-html text-danger ',
    'application/pdf': 'fi flaticon-pdf text-danger '
  };
}
