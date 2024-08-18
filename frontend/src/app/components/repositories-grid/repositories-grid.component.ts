import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { map, Observable, of } from 'rxjs';
import { LinkRendererComponent } from '../link-renderer/link-renderer.component';
import { MaterialCheckboxRendererComponent } from '../material-checkbox-renderer/material-checkbox-renderer.component';
import { environment } from '../../../environments/environment';
import { Statistics } from 'src/app/types';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'repositories-grid',
  templateUrl: './repositories-grid.component.html',
  styleUrls: ['./repositories-grid.component.scss'],
})
export class RepositoriesGridComponent {
  apiUrl = `${environment.domain}/api/integrations/github/repositories`;
  loading = false;
  statistics: Statistics | any;

  rowData$: Observable<any[]> = of([]);

  columnDefs: ColDef[] = [
    {
      headerName: 'ID',
      field: 'repositoryId',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Organization Name',
      field: 'organization.name',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Link',
      field: 'htmlUrl',
      sortable: true,
      filter: true,
      cellRenderer: LinkRendererComponent,
    },
    {
      headerName: 'Slug',
      field: 'slug',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Included',
      field: 'included',
      cellRenderer: MaterialCheckboxRendererComponent,
    },
  ];

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.rowData$ = this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((response: any) => response.data));
  }

  fetchGithubProjects(): void {
    this.loading = true;

    this.http
      .get(
        `${environment.domain}/api/integrations/github/repositories/statistics`
      )
      .subscribe({
        next: (response: any) => {
          const { data } = response;

          this.statistics = data;
          this.notificationService.showMessage(
            'Statistics fetched for the included repositories.'
          );
        },
        error: (error) => this.notificationService.showException(error),
        complete: () => (this.loading = false),
      });
  }
}
