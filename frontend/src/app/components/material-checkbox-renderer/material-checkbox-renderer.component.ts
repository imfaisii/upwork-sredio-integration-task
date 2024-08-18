import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-material-checkbox-renderer',
  templateUrl: './material-checkbox-renderer.component.html',
})
export class MaterialCheckboxRendererComponent {
  public params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  public onChange(event: any) {
    this.params.data[this.params.colDef.field] = event.checked;
  }
}
