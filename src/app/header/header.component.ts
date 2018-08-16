import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}
  logout() {
    this.auth.requestLogout();
    this.router.navigate(['login']);
  }

  navigateToHome() {
    this.router.navigate(['/myfiles']);
  }

  navigateToUpload() {
    this.router.navigate(['upload']);
  }
}
