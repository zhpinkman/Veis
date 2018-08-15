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
        this.ngOnInit();
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

  ngOnInit() {
    console.log('kkkkkkkkkkkkkkkkkk');
    this.router.events.subscribe((url: any) => {
      this.url = url;
    });
    console.log(this.router.url); // to print only path eg:"/login"
    this.id = this.route.snapshot.paramMap.get('id');
    this.path = this.route.snapshot.paramMap.get('path');

    console.log(this.id);
    console.log(this.path);

    let paths = this.path.split(' ');

    for (let i = 0; i < paths.length; i++) {
      console.log(paths[i]);
    }
    if (this.id != 'zhivar') {
      console.log('ttttttttt');
      this.router.navigate(['/zzzz yyy/zhivar']);
    }
  }
}
