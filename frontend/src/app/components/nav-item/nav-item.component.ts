import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          height: '0rem',
          opacity: 0,
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class NavItemComponent {
  @Input() icon!: string;
  @Input() label!: string;
  @Input() routerLink!: string;
  @Input() children: any[] = [];

  isExpanded: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkIfRouteMatches();
      });
  }

  checkIfRouteMatches(): void {
    const currentUrl = this.router.url;

    if (this.children && this.children.length > 0) {
      this.isExpanded = this.children.some(
        (child) => currentUrl === child.routerLink
      );
    }
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
