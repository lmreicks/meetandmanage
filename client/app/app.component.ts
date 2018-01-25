import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private http: Http) {
    this.http.get('api/events').subscribe(res => {
      console.log(res);
    });

    this.http.post('api/events', {
      Title: "dfljk",
      Description: "dlkfjd",
      Timestamp: new Date()
    }).subscribe(res => {})
  }

}
