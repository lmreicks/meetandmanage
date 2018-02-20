import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CoreCacheService } from './services';

@Component({
  moduleId: 'app',
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less']
})
export class AppComponent {
  constructor(private authService: AuthService, private coreCache: CoreCacheService) {
    this.authService.handleAuthentication();

    this.coreCache.GetPayload();
  }
}
