import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/Services/auth.service';
import { Router } from '@angular/router';
import { FileService } from '@app/Services/file.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  // file:FileService;
  ngOnInit() {
  }
  showCurrentPath() {
    // let path: String = file.toString();
  }
}
