import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  opened: boolean = true;

  toggleSideNav() {
    this.opened = !this.opened;
  }
}
