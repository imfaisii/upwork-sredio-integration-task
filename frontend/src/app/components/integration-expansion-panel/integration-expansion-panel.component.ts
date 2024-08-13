import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IntegrationService } from '../../services/integration.service';

import { GithubIntegration } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-integration-expansion-panel',
  templateUrl: './integration-expansion-panel.component.html',
  styleUrls: ['./integration-expansion-panel.component.scss'],
})
export class IntegrationExpansionPanelComponent implements OnInit {
  faGithub = faGithub as IconProp;
  faCheckCircle = faCheckCircle as IconProp;

  connectionUrl = `${environment.domain}/auth/github`;

  githubIntegration: null | GithubIntegration = null;

  constructor(private integrationService: IntegrationService) {}

  ngOnInit(): void {
    this.integrationService.index().subscribe(({ data }) => {
      const githubIntegration = data.find(
        (i: GithubIntegration) => i?.githubId
      );

      if (!githubIntegration) return;

      this.githubIntegration = {
        ...githubIntegration,
        created_at_formatted: moment(githubIntegration.createdAt).format(
          'YYYY-MM-DD hh:mm A'
        ),
      };
    });
  }

  handleRemoveIntegrations() {
    this.integrationService.destroy().subscribe({
      next: (response) => (this.githubIntegration = null),
      error: (error) => console.error('Error removing integration:', error),
    });
  }
}
