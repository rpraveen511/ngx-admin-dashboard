import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';

import { ToastrService } from '../../../shared/services/toastr.service';
import { SinequaService } from '../../../shared/services/sinequa.service';
import { HttpClient } from '@angular/common/http';
import { LogsComponent } from '../logs/logs.component';


@Component({
  selector: 'ngx-platform-monitering',
  templateUrl: './platform-monitering.component.html',
  styleUrls: ['./platform-monitering.component.scss']
})
export class PlatformMoniteringComponent implements OnInit {

  urls = ['http://172.16.40.132/app/Demo/#/home',
    'http://172.16.40.132/app/AnalyticsDashboard/#/search',
    'http://172.16.40.132/app/people-finder/#/home']

  websiteSettings = {
    // hideSubHeader: true,
    columns: {
      website: {
        title: 'Website Name',
        type: 'string',
        width: '60%',
      },
      rechablity: {
        title: 'Reachability',
        type: 'html',
        filter: false,
        hideHeader: true,
        editable: false,
        sort: false,
        valuePrepareFunction: (value) => {
          if (value) {
            return this.sanitizer.bypassSecurityTrustHtml(
              `<i class="nb-chevron-up" style="color:green;font-size: xx-large"></i>`);
          } else {
            return this.sanitizer.bypassSecurityTrustHtml(
              `<i class="nb-chevron-down" style="color:red;font-size: xx-large"></i>`);
          }
        },
      },
    },
    pager: {
      perPage: 10
    },
    actions: { position: 'right' },
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

  };

  indexSettings = {
    hideSubHeader: true,
    columns: {
      label: {
        title: 'Index Name',
        type: 'string',
        width: '60%',
      },
      status: {
        title: 'Status',
        type: 'html',
        filter: false,
        hideHeader: true,
        editable: false,
        sort: false,
        valuePrepareFunction: (value) => {
          if (value==='running') {
            return this.sanitizer.bypassSecurityTrustHtml(
              `<i class="nb-chevron-up" style="color:green;font-size: xx-large"></i>`);
          } else {
            return this.sanitizer.bypassSecurityTrustHtml(
              `<i class="nb-chevron-down" style="color:red;font-size: xx-large"></i>`);
          }
        },
      },
      value: {
        title: 'Doc Count',
        type: 'string',
        width: '20%',
      },
    },
    pager: {
      perPage: 10
    },
    actions: false,
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

  };

  serverSettings = {
    hideSubHeader: true,
    columns: {
      name: {
        title: 'Node Name',
        type: 'string',
      },
      port: {
        title: 'Port',
        sort: false,
        type: 'string',
      },
      starttime: {
        title: 'Start Time',
        sort: false,
        type: 'string',
      },
      uptime: {
        title: 'Up Time',
        type: 'date',
        sort: false,
      },
      status: {
        title: 'Status',
        type: 'html',
        filter: false,
        hideHeader: true,
        editable: false,
        sort: false,
        valuePrepareFunction: (value) => {
          if (value === 'Running') {
            return this.sanitizer.bypassSecurityTrustHtml(
              `<i class="nb-chevron-up" style="color:green;font-size: xx-large;"></i>`);
          } else {
            return this.sanitizer.bypassSecurityTrustHtml(
              `<i class="nb-chevron-down" style="color:red;font-size: xx-large;"></i>`);
          }
        },
      },
      logs: {
        title: 'Logs',
        // type: 'html',
        // valuePrepareFunction: (item) => {
        //   return `<i class="ion-document"></i>`

        // },,
        type: 'custom',
        renderComponent: LogsComponent,
      },

    },
    pager: {
      perPage: 10
    },
    actions: {
      position: 'right',
      columnTitle: 'Logs',
      add: false,
      edit: false,
      delete: false,
      class: 'action-coloumn',
      // custom: [{name:'Logs',title:'<i class="ion-document"></i>'}]
    },
  };

  servers = ['node', 'engine', 'indexer', 'worker', 'webapp']

  websiteSource: LocalDataSource = new LocalDataSource();
  indexSource: LocalDataSource = new LocalDataSource();
  nodeSource: LocalDataSource = new LocalDataSource();
  engineSource: LocalDataSource = new LocalDataSource();
  indexerSource: LocalDataSource = new LocalDataSource();
  workerSource: LocalDataSource = new LocalDataSource();
  webappSource: LocalDataSource = new LocalDataSource();

  data = [
    {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    },
    {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    }, {
      id: 1,
      website: "google",
      rechablity: true,
    },
    {
      id: 2,
      website: "facebook",
      rechablity: true,
    },
    {
      id: 1,
      website: "twitter",
      rechablity: false,
    },
  ]

  constructor(
    private ss: SinequaService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    private https: HttpClient
  ) {

  }

  ngOnInit(): void {
    // this.https.get('www.google.com').subscribe(resp =>{
    //   console.log(resp)
    // })

    this.websiteSource.load(this.data);
    this.loadIndexes();
    this.servers.forEach(item => {
      this.loadData(item);
    })
    // this.urls.forEach(url => {
    //   this.https.get(url).subscribe(resp =>{
    //     console.log(resp)
    //   })
    // })
  }

  loadIndexes(refresh=false) {
    let data = {
      "method": "dev.plugin",
      "plugin": "IndexSizeKPI",
      "output": "json",
      "user": "admin",
      "password": "admin"
    }
    this.ss.getData(data).subscribe(resp => {
      if (resp['methodresult'] === 'ok') {
        let data = resp['indexsize'];
        this.indexSource.load(data);
        refresh ? this.toastr.showToast('success', 'Data Refreshed', '') : '' ;
      } else {
        this.toastr.showToast('danger', 'Something went wrong', 'Please try after sometime')
      }
    })

  }

  loadData(item,refresh=false) {
      let data = {
        "method": "operation.serverstatus",
        "component": item,
        "advanced": false,
        "user": "admin",
        "password": "admin",
        "output": "json"
      }
      this.ss.getServerStatus(data).subscribe(resp => {
        if (resp['methodresult'] === 'ok') {          
          let data = resp['entries'];
          switch (item) {
            case 'node':
              this.nodeSource.load(data);
              break;
            case 'engine':
              this.engineSource.load(data);
              break;
            case 'indexer':
              this.indexerSource.load(data);
              break;
            case 'worker':
              this.workerSource.load(data);
              break;
            case 'webapp':
              this.webappSource.load(data);
              break;
          }
          refresh ? this.toastr.showToast('success', 'Data Refreshed', '') : '' ;
        } else {
          this.toastr.showToast('danger', 'Something went wrong', 'Please try after sometime')
        }
      })
  }

  addRecord(event) {
    if (event.newData.website) {
      event.confirm.resolve(event.newData);
    }
    else {
      this.toastr.showToast('warning', 'Please add Website Name', '')
    }
  }

  updateRecord(event) {
    // var data = {
    //   "name": event.newData.employee_name,
    //   "salary": event.newData.employee_salary,
    //   "age": event.newData.employee_age
    // };
    // this.http.post<Employee>('/api/v1/create', data).subscribe(
    //   res => {
    //     console.log(res);
    //     event.confirm.resolve(event.newData);
    //   },
    //   (err: HttpErrorResponse) => {
    //     if (err.error instanceof Error) {
    //       console.log("Client-side error occured.");
    //     } else {
    //       console.log("Server-side error occured.");
    //     }
    //   });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
