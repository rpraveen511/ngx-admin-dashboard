import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent
} from "@daypilot/daypilot-lite-angular";
import { NbDialogService } from '@nebular/theme';

import { SinequaService } from '../../../shared/services/sinequa.service';

@Component({
  selector: 'ngx-monitering',
  templateUrl: './monitering.component.html',
  styleUrls: ['./monitering.component.scss']
})
export class MoniteringComponent implements OnInit {

  @ViewChild("day") day!: DayPilotCalendarComponent;
  @ViewChild("week") week!: DayPilotCalendarComponent;
  @ViewChild("month") month!: DayPilotMonthComponent;
  @ViewChild("navigator") nav!: DayPilotNavigatorComponent;
  @ViewChild('dialog') dialog:TemplateRef<any>;


  @Input() eventData = {};

  events: DayPilot.EventData[] = [];
  date = DayPilot.Date.today();
  server = {
    node: '',
    jobType: 'all',
    statusType: 'all'
  }
  nodes = [];
  jobTypes = [
    { name: 'All', value: 'all' },
    { name: 'Collections', value: 'collections' },
    { name: 'Domain', value: 'domain' },
    { name: 'Command', value: 'command' }];

    statusTypes = [
    { name: 'All', value: 'all' },
    { name: 'Error', value: 'error' },
    { name: 'Running', value: 'Running' },
    { name: 'Warning', value: 'Warning' },
    { name: 'Ok', value: 'OK' }];

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 1,
    skipMonths: 1,
    cellWidth: 25,
    cellHeight: 25,
    dayHeaderHeight: 30,
    titleHeight: 30,
    onVisibleRangeChanged: args => {
      alert('1')
      this.loadEvents();
    }
  };

  legendTitle = [];

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
    },
    onEventClick: function(args) {
      console.log(args)
      alert("Event clicked: " + args.e.text());
    },
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
    onEventClick: function(args) {
      this.eventData = args.e.data;
    },
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
    onEventClick: function(args) {
      this.eventData = args.e.data;
    },
  };

  configMonth: DayPilot.MonthConfig = {

  };


  constructor(
    private ss: SinequaService,
    private dialogService: NbDialogService,
  ) {
    this.viewMonth();
  }

  ngOnInit() {
    this.loadEvents();
    this.getNodes();
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
      if (resp['methodresult'] === 'ok'){
        this.nodes = resp['indexsize'];
        this.server.node = resp['indexsize'][0].value;
      }      
    })
  }

  async loadEvents() {
    let data = {
      "method": "dev.plugin",
      "plugin": "JobScheduleCalendar",
      "output": "json",
      "user": "admin",
      "password": "admin"
    }
    await this.ss.getEvents(data).subscribe(resp => {
      if (resp['methodresult'] === 'ok'){
        console.log(resp)
      let data = resp['events']     
      this.events =  data.map( item => {
        // item['bubbleHtml'] = '';
        // item['bubbleHtml'] = "<div style='font-weight:bold'>Event Details</div><div>Scheduler Event 1</div>"
        return item
      });
      // this.showLegend(this.events);
      }      
    })   
    // this.events = [
    //   {
    //     "id": "/PlatformDashboard/JobStatus/|665A821BDEFE4E9B9716AC752A722B8E",
    //     "start": "2021-11-25T04:01:41",
    //     "end": "2021-11-25T04:25:49",
    //     "text": "WebAppSINEQUA-POC",
    //     "barColor": "#e69140",
    //     "barBackColor": "#e69140",
    //     "backColor": "#e69140",
    //     bubbleHtml: "<div style='font-weight:bold'>Event Details</div><div>Scheduler Event 1</div>",
        
    //   },
    //   {
    //     "id": "/PlatformDashboard/JobStatus/|9B0A6EAC90974CA28387216FC3B993F5",
    //     "start": "2021-11-25T09:17:14",
    //     "end": "2021-11-25T09:17:27",
    //     "text": "/expertfinder.csv/ExpertFinder/",
    //     "barColor": "#40e6a2",
    //     "barBackColor": "#40e6a2",
    //     "backColor": "#40e6a2",
    //     bubbleHtml: "<div style='font-weight:bold'>Event Details</div><div>Scheduler Event 1</div>",

    //   },
    //   {
    //     "id": "/PlatformDashboard/JobStatus/|81C1F50922B94B87B02C1FAAA10E853D",
    //     "start": "2021-11-25T09:34:25",
    //     "end": "2021-11-25T09:34:27",
    //     "text": "/expertfinder.csv/ExpertFinder/",
    //     "barColor": "#40e6a2",
    //     "barBackColor": "#40e6a2",
    //     "backColor": "#40e6a2",
    //     bubbleHtml: "<div style='font-weight:bold'>Event Details</div><div>Scheduler Event 1</div>",

    //   },
    // ]
  }

  
  loadEventsBasedonSelection() {
    let data = {
      "method": "dev.plugin",
      "plugin": "JobScheduleCalendar",
      "nodeName": this.server.node,
      "jobType": this.server.jobType,
      "statusType" : this.server.statusType,
      "output": "json",
      "user": "admin",
      "password": "admin"
    }
    this.ss.getEvents(data).subscribe(resp => {
      if (resp['methodresult'] === 'ok'){
        this.events = resp['events'];
      console.log(this.events)
      // this.showLegend(this.events);
      }      
    })  
    
  }

  showLegend(data){
    this.legendTitle = [...new Map(data.map((item) => [item["text"], item])).values()];
    // this.legendTitle = [...new Set(data.map(item => item.text))]
    // this.legendTitle = data.filter((a, i) => data.findIndex((s) => a.text === s.text) === i);
    console.log(this.legendTitle)
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

  selectNode(event) {
    this.server.node = event.target.value;
    this.loadEventsBasedonSelection();
  }

  selectJobType(event) {
    if (event.target.value === 'all' && this.server.statusType === 'all') {
      this.loadEvents();
    } else {
      this.server.jobType = event.target.value;
      this.loadEventsBasedonSelection();
    }
  }

  selectStatus(event) {
    if (event.target.value === 'all' && this.server.jobType === 'all') {
      this.loadEvents();
    } else {
      this.server.statusType = event.target.value;
      this.loadEventsBasedonSelection();
    }
  }

  openDilog(dialog: TemplateRef<any>) {    
    this.dialogService.open(
      dialog,this.eventData);
  }

}