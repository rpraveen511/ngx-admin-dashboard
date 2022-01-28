import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { NbCardModule, NbProgressBarModule, NbIconModule } from '@nebular/theme';
import { ECommerceModule } from '../e-commerce/e-commerce.module';
import { CountryOrdersMapService } from '../e-commerce/country-orders/map/country-orders-map.service';


import { ProjectRoutingModule } from './project-routing.module';
import { MoniteringComponent } from './monitering/monitering.component';
import { PlatformMoniteringComponent } from './platform-monitering/platform-monitering.component';
import { DeploymentComponent } from './deployment/deployment.component';
import { KpiDashboardComponent } from './kpi-dashboard/kpi-dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MoniteringComponent,
    PlatformMoniteringComponent,
    DeploymentComponent,
    KpiDashboardComponent,
  ],
  imports: [
    NbCardModule,    
    NbProgressBarModule,
    NbIconModule,
    CommonModule,
    ProjectRoutingModule,
    ECommerceModule,
    DayPilotModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers:    [ CountryOrdersMapService ]
})
export class ProjectModule { }
