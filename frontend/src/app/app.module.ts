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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { RepositoriesGridComponent } from './components/repositories-grid/repositories-grid.component';
import { LinkRendererComponent } from './components/link-renderer/link-renderer.component';
import { MaterialCheckboxRendererComponent } from './components/material-checkbox-renderer/material-checkbox-renderer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    IntegrationExpansionPanelComponent,
    RepositoriesGridComponent,
    LinkRendererComponent,
    MaterialCheckboxRendererComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    AgGridModule,

    MatListModule,
    MatSidenavModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
