import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-angular-app';

  constructor(private http: HttpClient){
    // this.http.get('https://ecommerce-backend-8dwc.onrender.com/api/users/').subscribe(data => {
    //   console.log(data);
    // })
  }
}
