import { FileService } from './../Services/file.service';
import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/Services/auth.service';
import { Router } from '@angular/router';
import { PathClass } from '@app/PathClass';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private fileService: FileService
  ) {
    this.fileService.currentPathRefreshed.subscribe(data => {
      this.makeBreadCrumbs();
    });
  }

  ngOnInit() {}
  logout() {
    this.auth.requestLogout();
  }

  navigateToHome() {
    this.router.navigate(['/myfiles']);
  }

  navigateToUpload() {
    this.router.navigate(['upload']);
  }

  breadcrumbs = [];
  makeBreadCrumbs() {
    let currentPath: PathClass = this.fileService.currentPath;
    // console.log(currentPath.name);
    this.breadcrumbs = [];
    while (currentPath.getParent() != null) {
      this.breadcrumbs.push(currentPath);
      currentPath = currentPath.getParent();
      // console.log(currentPath.name);
    }
    this.breadcrumbs.reverse();
  }

  navigateTo(path: PathClass) {
    // this.fileService.currentPath = path;
    // console.log(this.fileService.currentPath.name);
    // console.log(this.fileService.currentPath.getParent().name);
    this.fileService.navigateTo(path);
    this.makeBreadCrumbs();
  }
}
