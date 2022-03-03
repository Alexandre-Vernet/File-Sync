import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
      private http: HttpClient
  ) {
  }

  sendMessage() {
    const message = 'test';
    this.http.post('/api/message', { message }).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
    );
  }
}
