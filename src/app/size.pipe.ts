import { Pipe, PipeTransform } from '@angular/core';
import { humanizeBytes } from 'ngx-uploader';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {
  humanizeBytes: Function;
  constructor() {
    this.humanizeBytes = humanizeBytes;
  }
  transform(value: number): string {
    return this.humanizeBytes(value);
  }
}
