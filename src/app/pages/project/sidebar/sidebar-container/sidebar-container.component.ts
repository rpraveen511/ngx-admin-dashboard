import { Component, OnInit, EventEmitter, Output, Input, ContentChild, DoCheck } from '@angular/core';
import { style, state, animate, transition, trigger } from "@angular/animations";
import { SidebarExpandedComponent } from '../sidebar-expanded/sidebar-expanded.component';
import { SidebarMainComponent } from '../sidebar-main/sidebar-main.component';


@Component({
  selector: 'ngx-sidebar-container',
  templateUrl: './sidebar-container.component.html',
  styleUrls: ['./sidebar-container.component.scss'],
  animations: [
    trigger('slideExpanded', [
      state('visible', style({ width: '*', display: 'block' })),
      state('hidden', style({ width: '0px', display: 'none'})),
      transition('hidden <=> visible', animate('200ms ease'))
    ]),
    trigger('slideCollapsed', [
      state('visible', style({ width: '0px', display: 'none' })),
      state('hidden', style({ width: '*', display: 'block'})),
      transition('hidden <=> visible', animate('200ms ease'))
    ]),
  ],
})
export class SidebarContainerComponent implements OnInit, DoCheck {

  @ContentChild(SidebarExpandedComponent) left!: SidebarExpandedComponent;
  @ContentChild(SidebarMainComponent) main!: SidebarMainComponent;

  state: "visible" | "hidden" = "visible";

  @Input()
  expanded: boolean = true;

  @Output()
  expandedChange: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {}

  ngDoCheck() {
    this.state = this.expanded ? "visible" : "hidden";
  }

  toggle() {
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
}
