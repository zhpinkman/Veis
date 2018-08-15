import { FileService } from '@app/Services/file.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError
} from '@angular/router';

@Component({
  selector: 'app-route-test',
  templateUrl: './route-test.component.html',
  styleUrls: ['./route-test.component.scss']
})
export class RouteTestComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
      }
      // else if(event instanceof )

      if (event instanceof NavigationEnd) {
        console.log('shitshitshitshit');
        this.func();
        // Hide loading indicator
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        console.log(event.error);
      }
    });
  }

  public id: string;
  public path: string;
  public url: string;

  ngOnInit() {}

  func() {
    this.fileService.getRoute(this.route);
  }
}
