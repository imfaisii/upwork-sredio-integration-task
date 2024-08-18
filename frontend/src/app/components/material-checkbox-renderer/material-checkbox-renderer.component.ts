import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-material-checkbox-renderer',
  templateUrl: './material-checkbox-renderer.component.html',
})
export class MaterialCheckboxRendererComponent {
  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  public params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  public onChange({ checked }: { checked: boolean }) {
    this.params.data[this.params.colDef.field] = checked;

    const { _id } = this.params.data;

    this.http
      .put(
        `${environment.domain}/api/integrations/github/repositories/${_id}/update`,
        {
          included: checked,
        }
      )
      .subscribe(
        (response) => this.notificationService.showMessage("Successfully updated."),
        (error) => this.notificationService.showMessage("Failed to update.")
      );
  }
}
