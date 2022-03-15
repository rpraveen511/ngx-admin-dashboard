import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { DayPilot, DayPilotCalendarComponent, DayPilotMonthComponent } from "@daypilot/daypilot-lite-angular";
import { NbDialogService } from '@nebular/theme';

import { ToastrService } from '../../../shared/services/toastr.service';
import { SinequaService } from '../../../shared/services/sinequa.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'ngx-monitering',
  templateUrl: './monitering.component.html',
  styleUrls: ['./monitering.component.scss']
})
export class MoniteringComponent implements OnInit, AfterViewInit {

  @ViewChild("day") day!: DayPilotCalendarComponent;
  @ViewChild("week") week!: DayPilotCalendarComponent;
  @ViewChild("month") month!: DayPilotMonthComponent;

  events: DayPilot.EventData[] = [];
  date = DayPilot.Date.today();
  dateDisplayFormat = '';
  dayIndex = 0;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  eventId = '';
  eventDetails = {};
  showNavigator = false;
  server = {
    node: '',
    jobType: 'All',
    statusType: 'All'
  };
  nodes = [];
  jobTypes = [
    { name: 'All', value: 'All' },
    { name: 'Collections', value: 'connector' },
    { name: 'Domain', value: 'domain' },
    { name: 'Command', value: 'command' }];

  statusTypes = [
    { name: 'All', value: 'All' },
    { name: 'Error', value: 'Error' },
    { name: 'Running', value: 'Running' },
    { name: 'Warning', value: 'Warning' },
    { name: 'Ok', value: 'OK' }];

  views = [{ name: 'Month', value: 'Month' }, { name: 'Week', value: 'Week' }, { name: 'Day', value: 'Day' }]

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 1,
    skipMonths: 1,
    cellWidth: 25,
    cellHeight: 25,
    dayHeaderHeight: 30,
    titleHeight: 30,
    selectMode:'Month',
    onVisibleRangeChanged: args => {
      this.loadEvents();
    }
  };

  configDay: DayPilot.CalendarConfig = {
    eventMoveHandling: 'Disabled',
    onEventClick: function (args) {
      localStorage.setItem('eventId', args.e.data.id);
    },
  };

  configWeek: DayPilot.CalendarConfig = {
    viewType: "Week",
    eventMoveHandling: 'Disabled',
    eventResizeHandling: 'Disabled',
    onEventClick: function (args) {
      args.preventDefault();
      localStorage.setItem('eventId', args.e.data.id);
    },
  };

  configMonth: DayPilot.MonthConfig = {
    eventMoveHandling: 'Disabled',
    onEventClick: function (args) {
      args.preventDefault();
      localStorage.setItem('eventId', args.e.data.id);
    },
    onEventClicked: function (args) {
      alert("clicked: " + args.e.id());
    }
  };

  constructor(
    private ss: SinequaService,
    private dialogService: NbDialogService,
    private toastr: ToastrService
  ) {
    this.viewDay();
  }

  ngOnInit() {
    // this.dateDisplayFormat = this.months[this.date.getMonth()] + " " + this.date.getYear();
    this.dateDisplayFormat = this.date.getDay() + " " + this.months[this.date.getMonth()] + " "+ this.date.getYear();
    this.getNodes();
  }

  ngAfterViewInit(){
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
      if (resp['methodresult'] === 'ok') {
        this.nodes = resp['indexsize'];
        this.server.node = resp['indexsize'][0].value;
      } else {
        this.toastr.showToast('danger', 'Something went wrong', 'Please try after sometime')
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
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
    this.ss.getData(data).subscribe(resp => {
      if (resp['methodresult'] === 'ok') {
        this.events = resp['events'];
      } else {
        this.toastr.showToast('danger', 'Something went wrong', 'Please try after sometime');
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
  }

  loadEventsBasedonSelection() {
    let data = {
      "method": "dev.plugin",
      "plugin": "JobScheduleCalendar",
      "nodeName": this.server.node,
      "jobType": this.server.jobType,
      "statusType": this.server.statusType,
      "output": "json",
      "user": "admin",
      "password": "admin"
    }
    this.ss.getData(data).subscribe(resp => {
      if (resp['methodresult'] === 'ok') {
        this.events = resp['events'];
      } else {
        this.toastr.showToast('danger', 'Something went wrong', 'Please try after sometime')
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    })
  }

  getEventData() {
    let data = {
      "method": "dev.plugin",
      "plugin": "CalendarEventDetails",
      "output": "json",
      "user": "admin",
      "password": "admin",
      "ID": localStorage.getItem('eventId')
    }
    this.ss.getNodes(data).subscribe(resp => {
      if (resp['methodresult'] === 'ok') {
        let eventdata = resp['details'][0];
        if (eventdata.stats) {
          eventdata.stats = eventdata.stats.split("\r\n");
        }
        this.eventDetails = eventdata;
      } else {
        this.toastr.showToast('danger', 'Something went wrong', 'Please try after sometime')
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
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

  changeDateNav(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;
    switch (this.configNavigator.selectMode) {
      case 'Day':
        this.dateDisplayFormat = this.configDay.startDate.getDay() + " " + this.months[this.configDay.startDate.getMonth()] + " "
          + this.configDay.startDate.getYear();
        break;
      case 'Week':
        var t = date.toDate();
        t.setDate(t.getDate() - t.getDay());
        let startDate = new DayPilot.Date(t);
        let endDate = new DayPilot.Date(startDate).addDays(6)
        this.dateDisplayFormat = startDate.getDay() + " " + this.months[startDate.getMonth()]
          + " " + startDate.getYear() + " - " + endDate.getDay() + " " + this.months[endDate.getMonth()]
          + " " + endDate.getYear();
        break;
      case 'Month':
        this.dateDisplayFormat = this.months[this.configMonth.startDate.getMonth()] + " "
          + this.configMonth.startDate.getYear();
        break;
    }
  }

  changeDate(value): void {
    if (value === 'previous') {
      switch (this.configNavigator.selectMode) {
        case 'Day':
          this.dayIndex -= 1;
          this.configDay.startDate = DayPilot.Date.today().addDays(this.dayIndex);
          this.dateDisplayFormat = this.configDay.startDate.getDay() + " " + this.months[this.configDay.startDate.getMonth()] + " "
            + this.configDay.startDate.getYear();
          break;
        case 'Week':
          this.dayIndex -= 7;
          this.configWeek.startDate = DayPilot.Date.today().addDays(this.dayIndex);
          var t = this.configWeek.startDate.toDate();
          t.setDate(t.getDate() - t.getDay());
          let startDate = new DayPilot.Date(t);
          let endDate = new DayPilot.Date(startDate).addDays(6)
          this.dateDisplayFormat = startDate.getDay() + " " + this.months[startDate.getMonth()]
            + " " + startDate.getYear() + " - " + endDate.getDay() + " " + this.months[endDate.getMonth()]
            + " " + endDate.getYear();
          break;
        case 'Month':
          this.dayIndex -= 30;
          this.configMonth.startDate = DayPilot.Date.today().addDays(this.dayIndex);
          this.dateDisplayFormat = this.months[this.configMonth.startDate.getMonth()] + " "
            + this.configMonth.startDate.getYear();
          break;
      }
    } else {
      switch (this.configNavigator.selectMode) {
        case 'Day':
          this.dayIndex += 1;
          this.configDay.startDate = DayPilot.Date.today().addDays(this.dayIndex);
          this.dateDisplayFormat = this.configDay.startDate.getDay() + " " + this.months[this.configDay.startDate.getMonth()] + " "
            + this.configDay.startDate.getYear();
          break;
        case 'Week':
          this.dayIndex += 7;
          this.configWeek.startDate = DayPilot.Date.today().addDays(this.dayIndex);
          var t = this.configWeek.startDate.toDate();
          t.setDate(t.getDate() - t.getDay());
          let startDate = new DayPilot.Date(t);
          let endDate = new DayPilot.Date(startDate).addDays(6)
          this.dateDisplayFormat = startDate.getDay() + " " + this.months[startDate.getMonth()]
            + " " + startDate.getYear() + " - " + endDate.getDay() + " " + this.months[endDate.getMonth()]
            + " " + endDate.getYear();
          break;
        case 'Month':
          this.dayIndex += 30;
          this.configMonth.startDate = DayPilot.Date.today().addDays(this.dayIndex);
          this.dateDisplayFormat = this.months[this.configMonth.startDate.getMonth()] + " "
            + this.configMonth.startDate.getYear();
          break;
      }
    }
  }

  displayNavigator() {
    this.showNavigator = !this.showNavigator;
  }

  selectView(event) {
    switch (event) {
      case 'Day':
        this.viewDay();
        this.configNavigator.selectMode = 'Day';
        this.dateDisplayFormat = this.date.getDay() + " " + this.months[this.date.getMonth()] + " "
          + this.date.getYear();
        break;
      case 'Week':
        this.viewWeek();
        this.configNavigator.selectMode = 'Week';
        this.configWeek.startDate = DayPilot.Date.today();
        var t = this.configWeek.startDate.toDate();
        t.setDate(t.getDate() - t.getDay());
        let startDate = new DayPilot.Date(t);
        let endDate = new DayPilot.Date(startDate).addDays(6);
        setTimeout(() => {
          this.dateDisplayFormat = startDate.getDay() + " " + this.months[startDate.getMonth()]
          + " " + startDate.getYear() + " - " + endDate.getDay() + " " + this.months[endDate.getMonth()]
          + " " + endDate.getYear();          
        }, 10);        
        break;
      case 'Month':
        this.viewMonth();
        this.configNavigator.selectMode = 'Month';
        this.dateDisplayFormat = this.months[this.date.getMonth()] + " " + this.date.getYear();
        break;
    }
    this.dayIndex = 0;
  }

  selectNode(event) {
    this.server.node = event;
    this.loadEventsBasedonSelection();
  }

  selectJobType(event) {
    if (event === 'all' && this.server.statusType === 'all') {
      this.loadEvents();
    } else {
      this.server.jobType = event;
      this.loadEventsBasedonSelection();
    }
  }

  selectStatus(event) {
    if (event === 'all' && this.server.jobType === 'all') {
      this.loadEvents();
    } else {
      this.server.statusType = event;
      this.loadEventsBasedonSelection();
    }
  }

  openDilog(dialog: TemplateRef<any>) {
    if (localStorage.getItem('eventId')) {
      this.getEventData();
      this.dialogService.open(
        dialog, { context: this.eventDetails });
    }
    localStorage.setItem('eventId', '')
  }
}