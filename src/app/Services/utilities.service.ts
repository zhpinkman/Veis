import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  constructor(private _service: NotificationsService, private title: Title) {}
  success(title, content) {
    this._service.success(title, content);
  }

  error(title, content) {
    this._service.error(title, content);
  }

  alert(title, content) {
    this._service.alert(title, content);
  }

  setTitle(title: string) {
    this.title.setTitle(title);
  }
}
