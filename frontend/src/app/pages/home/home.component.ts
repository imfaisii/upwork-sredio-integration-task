import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pages-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public pageName: string;

  constructor(router: Router) {
    this.pageName =
      router.url == '/' ? 'Home' : router.url.replace('/', '').toUpperCase();
  }
}
