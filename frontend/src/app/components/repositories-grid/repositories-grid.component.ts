import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { map, Observable, of } from 'rxjs';
import { LinkRendererComponent } from '../link-renderer/link-renderer.component';
import { MaterialCheckboxRendererComponent } from '../material-checkbox-renderer/material-checkbox-renderer.component';

@Component({
  selector: 'repositories-grid',
  templateUrl: './repositories-grid.component.html',
  styleUrls: ['./repositories-grid.component.scss'],
})
export class RepositoriesGridComponent {
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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.rowData$ = this.http
      .get<any[]>('http://localhost:3000/api/integrations/github/repositories')
      .pipe(map((response: any) => response.data));
  }
}
