import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeploymentComponent } from './deployment/deployment.component';
import { KpiDashboardComponent } from './kpi-dashboard/kpi-dashboard.component';
import { MoniteringComponent } from './monitering/monitering.component';
import { PlatformMoniteringComponent } from './platform-monitering/platform-monitering.component';

const routes: Routes = 
[{
  path: 'deployment',
  component: DeploymentComponent,
},
{
  path: 'kpi-dashboard',
  component: KpiDashboardComponent,
},
{
  path: 'monitering',
  component: MoniteringComponent,
},
{
  path: 'platform-monitering',
  component: PlatformMoniteringComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }

export const routedComponents = [
  DeploymentComponent,
  KpiDashboardComponent,
  MoniteringComponent,
  PlatformMoniteringComponent
];
