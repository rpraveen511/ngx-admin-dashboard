import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

import { SinequaService } from '../../../shared/services/sinequa.service';
import { ToastrService } from '../../../shared/services/toastr.service';

@Component({
  selector: 'ngx-deployment',
  templateUrl: './deployment.component.html',
  styleUrls: ['./deployment.component.scss']
})
export class DeploymentComponent implements OnInit {

  nodes = [];
  servernames = [];
  servers = ['node', 'engine', 'indexer', 'worker', 'webapp']

  server = {
    node: '',
    name:''
  };
  upgradeFlag = true;

  constructor(
    private ss: SinequaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {  
    this.getNodes();
    this.servers.forEach(server => {
      this.getServers(server);
    })
  }

  
  // ngOnChanges(changes: SimpleChanges) {
  //   this.generateAppointments()
  //   console.log(this.source.loadData)
  // }

  // ngAfterViewInit(): void {
  //   let length = this.events.length
  //   this.scheduler.ensureAppointmentVisible(this.events[length]?.id);
  // }
    
	// getWidth() : any {
	// 	if (document.body.offsetWidth < 850) {
	// 		return '80%';
	// 	}	
	// 	return (document.body.offsetWidth - document.body.offsetWidth/4);
	// }

  // async generateAppointments() {
  //   // let appointments = this.events.map(obj => ({...obj}));
  //   let data = {
  //     "method": "dev.plugin",
  //     "plugin": "JobScheduleCalendar",
  //     "output": "json",
  //     "user": "admin",
  //     "password": "admin"
  //   }
  //   this.ss.getData(data).subscribe(resp => {
  //     if (resp['methodresult'] === 'ok') {
  //       let data = resp['events'];
  //       data.map((item) =>{
  //         item['subject'] = item.text;
  //       });
  //       this.events = data;
  //       this.source.localData = data
  //       console.log(this.source)
  //       this.scheduler.ensureAppointmentVisible(this.events[0]?.id);
  //     } else {
  //       this.toastr.showToast('danger', 'Something went wrong', 'Please try after sometime');
  //     }
  //   },
  //   (err: HttpErrorResponse) => {
  //     if (err.error instanceof Error) {
  //       console.log("Client-side error occured.");
  //     } else {
  //       console.log("Server-side error occured.");
  //     }
  //   });
  //   // return this.events;
  // };

  // source: any = {
  //   dataType: 'array',
  //   dataFields: [
  //     { name: 'id', type: 'string' },
  //     // { name: 'text', type: 'string' },
  //     { name: 'subject', type: 'string' },

  //     { name: 'calendar', type: 'string' },
  //     { name: 'start', type: 'date' },
  //     { name: 'end', type: 'date' },
  //     { name: 'draggable', type: 'boolean' },
  //   ],
  //   id: 'id',
  //   localData: this.generateAppointments(),
  // };

  // dataAdapter: any = new jqx.dataAdapter(this.source);  

  // appointmentDataFields: any = {
  //   from: 'start',
  //   to: 'end',
  //   id: 'id',
  //   // subject: 'text',
  //   subject: 'subject',
  //   draggable: 'draggable',
  // };

  // resources: any =
  // {
  //     colorScheme: "scheme05",
  //     dataField: "calendar",
  //     orientation: 'horizontal',
  //     source: new jqx.dataAdapter(this.source)
  // };

  // BindingComplete(event: any): void 
  //   {
  //       console.log(this.source.localData)
  //   }
  
  
  
  // onCellClick(event) {
  //   console.log(event.args.appointment);
  // }

  // closeDilog(event) {
  //   this.scheduler.closeDialog();
  // }

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

  getServers(item){
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
        console.log(data)
        data.forEach(item => {
          this.servernames.push(item.name)
        })
        console.log(this.servernames)        
      } else {
        this.toastr.showToast('danger', 'Something went wrong', 'Please try after sometime')
      }
    })

  }

  selectNode(event) {
    this.server.node = event;
    // this.loadEventsBasedonSelection();
  }

  selectServer(event){
    this.server.node = event;
  }

  // loadEventsBasedonSelection() {
  //   let data = {
  //     "method": "dev.plugin",
  //     "plugin": "JobScheduleCalendar",
  //     "nodeName": this.server.node,
  //     "jobType": 'all',
  //     "statusType": 'all',
  //     "output": "json",
  //     "user": "admin",
  //     "password": "admin"
  //   }
  //   this.ss.getData(data).subscribe(resp => {
  //     if (resp['methodresult'] === 'ok') {
  //       this.events = resp['events'];
  //     } else {
  //       this.toastr.showToast('danger', 'Something went wrong', 'Please try after sometime')
  //     }
  //   },
  //   (err: HttpErrorResponse) => {
  //     if (err.error instanceof Error) {
  //       console.log("Client-side error occured.");
  //     } else {
  //       console.log("Server-side error occured.");
  //     }
  //   })
  // }

  upgradeServer(){
    this.upgradeFlag = !this.upgradeFlag;
  }
      
}

