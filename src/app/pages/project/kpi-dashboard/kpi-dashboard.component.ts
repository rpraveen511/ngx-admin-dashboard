import { Component, OnInit, OnDestroy,  } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { CountryOrderData } from '../../../@core/data/country-order';

@Component({
  selector: 'ngx-kpi-dashboard',
  templateUrl: './kpi-dashboard.component.html',
  styleUrls: ['./kpi-dashboard.component.scss']
})
export class KpiDashboardComponent implements OnInit, OnDestroy {

  private alive = true;

  countryName = '';
  countryData: number[] = [];
  countriesCategories: string[];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;

  options: any = {};
  themeSubscription: any;

  single: any[];
  multi: any[];
  multi1: any[];
  multi2: any[];
  single1: any[];
  view: any[] = [700, 400];

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

  xAxisLabel2: string = 'Date';
  yAxisLabel2: string = 'Time in ms';

  xAxisLabel5: string = 'Country';
  yAxisLabel5: string = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  legend: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  xAxisLabel1: string = 'Year';
  yAxisLabel1: string = 'Query Count';
  timeline: boolean = true;

  colorScheme1 = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  docDefinition: any;


  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private countryOrderService: CountryOrderData
    ) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.single =[
      {
        "name": "Germany",
        "value": 8940
      },
      {
        "name": "USA",
        "value": 5000
      },
      {
        "name": "France",
        "value": 7200
      },
        {
        "name": "UK",
        "value": 6200
      }
    ];
    this.multi=[
      {
        "name": "Germany",
        "series": [
          {
            "name": "2010",
            "value": 7300
          },
          {
            "name": "2011",
            "value": 8940
          }
        ]
      },
    
      {
        "name": "USA",
        "series": [
          {
            "name": "2010",
            "value": 7870
          },
          {
            "name": "2011",
            "value": 8270
          }
        ]
      },
    
      {
        "name": "France",
        "series": [
          {
            "name": "2010",
            "value": 5000
          },
          {
            "name": "2011",
            "value": 5800
          }
        ]
      }
    ];
    this.multi2=[
      {
        "name": "10-03-2022",
        "series": [
          {
            "name": "Load Time",
            "value": 73
          },
          {
            "name": "Response Time",
            "value": 89
          }
        ]
      },
    
      {
        "name": "09-03-2022",
        "series": [
          {
            "name": "Load Time",
            "value": 78
          },
          {
            "name": "Response Time",
            "value": 82
          }
        ]
      },
    
      {
        "name": "11-03-2022",
        "series": [
          {
            "name": "Load Time",
            "value": 50
          },
          {
            "name": "Response Time",
            "value": 58
          }
        ]
      }
    ];
    this.multi1 = [
      {
        "name": "Germany",
        "series": [
          {
            "name": "1990",
            "value": 620
          },
          {
            "name": "2010",
            "value": 730
          },
          {
            "name": "2011",
            "value": 890
          }
        ]
      },
    
      {
        "name": "USA",
        "series": [
          {
            "name": "1990",
            "value": 250
          },
          {
            "name": "2010",
            "value": 300
          },
          {
            "name": "2011",
            "value": 310
          }
        ]
      },
    
      {
        "name": "France",
        "series": [
          {
            "name": "1990",
            "value": 580
          },
          {
            "name": "2010",
            "value": 500
          },
          {
            "name": "2011",
            "value": 580
          }
        ]
      },
      {
        "name": "UK",
        "series": [
          {
            "name": "1990",
            "value": 570
          },
          {
            "name": "2010",
            "value": 620
          }
        ]
      }
    ];
    this.single1 = [
      {
        "name": "Germany",
        "value": 8940
      },
      {
        "name": "USA",
        "value": 5000
      },
      {
        "name": "France",
        "value": 7200
      },
      {
        "name": "India",
        "value": 8940
      },
      {
        "name": "Australia",
        "value": 5000
      },
      {
        "name": "Africa",
        "value": 7200
      }
    ];
  }

  ngOnInit() {
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
    this.countryOrderService.getCountriesCategories()
      .pipe(takeWhile(() => this.alive))
      .subscribe((countriesCategories) => {
        this.countriesCategories = countriesCategories;
      });
    this.selectCountryById(this.countryName)
  }

  selectCountryById(countryName: string) {
    this.countryName = countryName;
    this.countryOrderService.getCountriesCategoriesData(countryName)
      .pipe(takeWhile(() => this.alive))
      .subscribe((countryData) => {
        this.countryData = countryData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  downloadPdf(){
    
    }
}