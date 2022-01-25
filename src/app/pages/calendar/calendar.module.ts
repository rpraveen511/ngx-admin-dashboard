import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import {DataService} from "./data.service";
import {FormsModule} from "@angular/forms";
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";
import {HttpClientModule} from "@angular/common/http";
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DayPilotModule,
    SharedModule
  ],
  exports:      [ CalendarComponent ],
  providers:    [ DataService ]
})
export class CalendarModule { }
