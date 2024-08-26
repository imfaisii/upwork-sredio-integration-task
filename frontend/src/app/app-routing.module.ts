import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: HomeComponent },
  { path: 'clients', component: HomeComponent },
  { path: 'claims', component: HomeComponent },
  { path: 'users', component: HomeComponent },
  { path: 'messages', component: HomeComponent },
  { path: 'audit-logs', component: HomeComponent },
  { path: 'financial-dashboard', component: HomeComponent },
  { path: 'main-dashboard', component: HomeComponent },
  { path: 'integrations', component: HomeComponent },
  { path: 'platform-users', component: HomeComponent },
  { path: 'weekly-reports', component: HomeComponent },
  { path: 'projects', component: HomeComponent },
  { path: 'test-crossings', component: HomeComponent },
  { path: 'time-records', component: HomeComponent },
  { path: 'setup', component: HomeComponent },
  { path: 'rules', component: HomeComponent },
  { path: 'algorithm-logs', component: HomeComponent },
  { path: 'diagnostics', component: HomeComponent },
  { path: 'audit-logs', component: HomeComponent },
  { path: 'admin-settings', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
