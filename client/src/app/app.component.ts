import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { API_ROOT } from '../constants.module';

@Component({
  moduleId: 'app',
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less']
})
export class AppComponent {

  constructor(private http: Http) {
    this.http.get(API_ROOT).subscribe(res => {
      console.log(res);
    });

    let event = {
      Title: "dfljk",
      Description: "dlkfjd",
      Timestamp: new Date()
    };

    this.http.post('api/events', event);
  }

}
