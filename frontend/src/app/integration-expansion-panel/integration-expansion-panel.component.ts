import { Component } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-integration-expansion-panel',
  templateUrl: './integration-expansion-panel.component.html',
  styleUrls: ['./integration-expansion-panel.component.scss'],
})
export class IntegrationExpansionPanelComponent {
  faGithub = faGithub as IconProp;
}
