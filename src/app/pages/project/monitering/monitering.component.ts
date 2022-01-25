import { Component, OnInit, AfterViewInit, ViewChild, ComponentRef, ViewContainerRef } from '@angular/core';
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import { SinequaService } from '../../../shared/services/sinequa.service';


@Component({
  selector: 'ngx-monitering',
  templateUrl: './monitering.component.html',
  styleUrls: ['./monitering.component.scss']
})
export class MoniteringComponent implements OnInit, AfterViewInit {

  @ViewChild("day") day!: DayPilotCalendarComponent;
  @ViewChild("week") week!: DayPilotCalendarComponent;
  @ViewChild("month") month!: DayPilotMonthComponent;
  @ViewChild("navigator") nav!: DayPilotNavigatorComponent;
  @ViewChild("navigator") navigator!: DayPilotNavigatorComponent;
  @ViewChild("calendar") calendar!: DayPilotCalendarComponent;

  expanded: boolean = true;


  events: DayPilot.EventData[] = [];

  date = DayPilot.Date.today();



  server = {
    node: '',
    jobType: 'all',
    status: 'all'
  }

  nodes = [];
  jobTypes = [
    { name: 'All', value: 'all' },
    { name: 'Collections', value: 'collections' },
    { name: 'Domain', value: 'domain' },
    { name: 'Command', value: 'command' }];

  status = [
    { name: 'All', value: 'all' },
    { name: 'Error', value: 'error' },
    { name: 'Running', value: 'running' },
    { name: 'Ok', value: 'ok' }];

    views = [
      { name: 'Month', value: 'Month' },
      { name: 'Week', value: 'Week' },
      { name: 'Day', value: 'Day' },
    ];  

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 1,
    cellWidth: 25,
    cellHeight: 25,
    skipMonths: 3,
    dayHeaderHeight: 30,
    titleHeight: 30,
    onVisibleRangeChanged: args => {
      this.loadEvents();
    }
  };

  config: DayPilot.CalendarConfig = {
    // startDate: DayPilot.Date.today(),
    viewType: "Week",
    heightSpec: "Parent100Pct",
    cellHeight: 30,
    headerHeight: 30,
    hourWidth: 60,
    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");

      const dp = args.control;
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      });
    }
  };

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;
  }

  configDay: DayPilot.CalendarConfig = {
  };

  configWeek: DayPilot.CalendarConfig = {
    viewType: "Week",
    onTimeRangeSelected: async (args) => {
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      const dp = args.control;
      dp.clearSelection();
      if (!modal.result) { return; }
      dp.events.add(new DayPilot.Event({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      }));
    },
  };

  configMonth: DayPilot.MonthConfig = {

  };


  constructor(
    private ss: SinequaService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.viewMonth();
  }

  ngOnInit() {
    this.loadEvents();
    this.getNodes();
  }

  ngAfterViewInit(): void {
    this.loadEvents();
  }

  getNodes() {
    let data = {
      "method": "dev.plugin",
      "plugin": "GetNodeNames",
      "output": "json",
      "user": "admin",
      "password": "admin"
    }
    this.ss.getNodes(data).subscribe(resp => {
      this.nodes = resp['indexsize'];
      this.server.node = resp['indexsize'][0].value;
    })
  }

  loadEvents() {
    let data = {
      "method": "dev.plugin",
      "plugin": "JobScheduleCalendar",
      "output": "json",
      "user": "admin",
      "password": "admin"
    }
    this.ss.getEvents(data).subscribe(resp => {
      this.events = resp['events'];
    })
  }


  viewDay(): void {
    this.configNavigator.selectMode = "Day";
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek(): void {
    this.configNavigator.selectMode = "Week";
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth(): void {
    this.configNavigator.selectMode = "Month";
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }

  viewChange(): void {
    this.loadEvents();
  }

  selectView(event){
    switch(event.target.value) {
      case 'Day':
        this.viewDay();
        this.configNavigator.selectMode == 'Day'
        break;
      case 'Week':
        this.viewWeek();
        this.configNavigator.selectMode == 'Week'
        break;
      default:
        this.viewMonth();
        this.configNavigator.selectMode == 'Month'
    }
  }

  selectNode(event) {
    this.server.node = event.target.value;
    this.loadEventsBasedonSelection();
  }

  selectJobType(event) {
    if (event.target.value === 'all') {
      this.loadEvents();
    } else {
      this.server.jobType = event.target.value;
      this.loadEventsBasedonSelection();
    }
  }

  selectStatus(event) {
    this.server.node = event.target.value;
    this.loadEventsBasedonSelection();
  }

  loadEventsBasedonSelection() {
    let data = {
      "method": "dev.plugin",
      "plugin": "JobScheduleCalendar",
      "nodeName": this.server.node,
      "jobType": this.server.jobType,
      "output": "json",
      "user": "admin",
      "password": "admin"
    }
    this.ss.getEvents(data).subscribe(resp => {
      this.events = resp['events'];
    })
  }

}
