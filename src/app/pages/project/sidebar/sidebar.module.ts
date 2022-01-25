import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarCollapsedComponent } from './sidebar-collapsed/sidebar-collapsed.component';
import { SidebarContainerComponent } from './sidebar-container/sidebar-container.component';
import { SidebarExpandedComponent } from './sidebar-expanded/sidebar-expanded.component';
import { SidebarMainComponent } from './sidebar-main/sidebar-main.component';



@NgModule({
  declarations: [
    SidebarCollapsedComponent,
    SidebarContainerComponent,
    SidebarExpandedComponent,
    SidebarMainComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    SidebarCollapsedComponent,
    SidebarContainerComponent,
    SidebarExpandedComponent,
    SidebarMainComponent
  ]
})
export class SidebarModule { }
