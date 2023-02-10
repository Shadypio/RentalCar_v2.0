import { Component } from '@angular/core';
import { MyButtonConfig } from './components/my-button/config/my-button-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  myDefaultButton: MyButtonConfig = new MyButtonConfig("my-custom-button-class", "Default text", "fa fa-icon fa-user")
}
