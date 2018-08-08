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

  optionsStatus: Boolean = false;

  ngOnInit() {}
  logout() {
    this.auth.requestLogout();
    this.router.navigate(['login']);
  }

  navigateToUpload() {
    this.router.navigate(['upload']);
  }

  showOptions() {
    this.optionsStatus = true;
  }

  hideOptions() {
    this.optionsStatus = false;
  }
}
