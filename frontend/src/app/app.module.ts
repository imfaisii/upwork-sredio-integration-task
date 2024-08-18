import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IntegrationExpansionPanelComponent } from './components/integration-expansion-panel/integration-expansion-panel.component';
import { HttpClientModule } from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RepositoriesGridComponent } from './components/repositories-grid/repositories-grid.component';
import { LinkRendererComponent } from './components/link-renderer/link-renderer.component';
import { MaterialCheckboxRendererComponent } from './components/material-checkbox-renderer/material-checkbox-renderer.component';

@NgModule({
  declarations: [AppComponent, IntegrationExpansionPanelComponent, RepositoriesGridComponent, LinkRendererComponent, MaterialCheckboxRendererComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    AgGridModule,
    
    MatCheckboxModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
