import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from '../../../shared/services/toastr.service';

import { HttpClient, HttpParams } from '@angular/common/http';



@Component({
  selector: 'ngx-platform-monitering',
  templateUrl: './platform-monitering.component.html',
  styleUrls: ['./platform-monitering.component.scss']
})
export class PlatformMoniteringComponent implements OnInit {

  settings = {
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
          if(value){
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

  source: LocalDataSource = new LocalDataSource();
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    },{
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
    private https: HttpClient,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService

  ) {

  }

  ngOnInit(): void {
    this.https.get('www.google.com').subscribe(resp =>{
      console.log(resp)
    })

    this.source.load(this.data);
  }

  addRecord(event) {
    if(event.newData.website){
      event.confirm.resolve(event.newData);
    }
    else {
      this.toastr.showToast('warning', 'Please add Website Name','' )
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
    console.log(event)
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
