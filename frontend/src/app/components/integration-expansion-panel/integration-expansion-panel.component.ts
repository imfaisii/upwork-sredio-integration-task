import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IntegrationService } from '../../services/integration.service';

import { GithubIntegration } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { faCheckCircle, faLink } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'integration-expansion-panel',
  templateUrl: './integration-expansion-panel.component.html',
  styleUrls: ['./integration-expansion-panel.component.scss'],
})
export class IntegrationExpansionPanelComponent implements OnInit {
  faGithub = faGithub as IconProp;
  faCheckCircle = faCheckCircle as IconProp;
  faLink = faLink as IconProp;
  githubIntegration: null | GithubIntegration = null;

  connectionUrl = `${environment.domain}/auth/github?prompt=login`;

  constructor(
    private integrationService: IntegrationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.integrationService.index().subscribe({
      next: ({ data }) => {
        const githubIntegration = data.find(
          (i: GithubIntegration) => i?.githubId
        );

        if (!githubIntegration) return;

        this.githubIntegration = {
          ...githubIntegration,
          updated_at_formatted: moment(githubIntegration.updatedAt).format(
            'YYYY-MM-DD hh:mm A'
          ),
        };
      },
      error: (e) => this.notificationService.showException(e),
    });
  }

  handleRemoveIntegrations() {
    this.integrationService.destroy().subscribe({
      next: (response) => (this.githubIntegration = null),
      error: (error) => this.notificationService.showMessage(error.message),
    });
  }

  reconnectGithub(event: MouseEvent): void {
    event.stopPropagation();
    window.location.href = this.connectionUrl;
  }
}
