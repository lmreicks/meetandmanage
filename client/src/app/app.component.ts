import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  moduleId: 'app',
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less']
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.handleAuthentication();
  }
}
