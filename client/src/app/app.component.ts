import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CoreCacheService } from './services/core-cache.service';
import { GoogleEventsService } from './event/google-event.service';

@Component({
  moduleId: 'app',
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less']
})
export class AppComponent {
  constructor(private authService: AuthService, private coreCache: CoreCacheService, private goog: GoogleEventsService) {}
}
