import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute,Router } from "@angular/router";

@Component({
  selector: 'ngx-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value;
  @Input() rowData: any;
  baseApiURL: string = environment.backendAPI;


  constructor(
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {

  }

  clicked() {
    // console.log(window.location.href)
    // console.log(this.router.url)
    console.log(this.rowData.logs.download)
    let url = 'http://172.16.40.132/' + this.rowData.logs.download
    window.open(url, "_blank");
    //  this.router.navigateByUrl('/'+this.rowData.logs.download,'_blank')
  }

}


