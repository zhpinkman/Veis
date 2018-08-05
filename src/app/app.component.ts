import { Component } from '@angular/core';
import { UtilitiesService } from '@app/Services/utilities.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  faCoffee = faCoffee;
  constructor( public util: UtilitiesService ) {}
  
  options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  }

}
