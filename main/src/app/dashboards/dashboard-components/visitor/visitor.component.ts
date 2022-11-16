import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  ApexNonAxisChartSeries,
  ApexResponsive
} from 'ng-apexcharts';
import { Chart } from 'chart.js';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { AnalisisService } from 'src/app/services/analisis.service';
import { subscribeOn } from 'rxjs/operators';
import * as moment from 'moment';

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

export interface VisitorChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  colors: string[];
  stroke: any;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
}


@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit {
  public list: any = [];
  chart = [];

  @ViewChild('visitor-chart') chart2: ChartComponent = Object.create(null);

  // This is line chart
  // bar chart
  /* public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 10
  };
  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 39, 80, 15, 76, 35, 40], label: 'mmHg' }
  ];
  public lineChartLabels: Array<any> = [
    'Lunes',
    'Martes',
    'Miércoles'
  ];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(25,118,210,0.1)',
      borderColor: 'rgba(25,118,210,1)',
      pointBackgroundColor: 'rgba(25,118,210,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(25,118,210,0.5)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(38,218,210,0.1)',
      borderColor: 'rgba(38,218,210,1)',
      pointBackgroundColor: 'rgba(38,218,210,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(38,218,210,0.5)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
 */
  /*   public randomize(): void {
      // Only Change 3 values
      const data = [
        Math.round(Math.random() * 100),
        59,
        80,
        Math.random() * 100,
        56,
        Math.random() * 100,
        40
      ];
  
    } */


  constructor(private _analisis: AnalisisService) {
    /*  this._analisis.dataProducto().subscribe(res => {
       this.list = res; */
    //const prod = this.list.producto;
    //console.log(res);

    /* this.lineChartOptions = {
      series: [
        {
          name: 'Clicked',
          data: [10, 20, 30, 40, 50]
        },
        {
          name: 'Sent',
          data: [10, 20, 30, 40, 50]
        }
      ],
      chart: {
        height: 290,
        fontFamily: 'Poppins,sans-serif',
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 3,
      },
      stroke: {
        curve: 'smooth',
        width: '2'
      },
      colors: ['#40DECE', '#1e88e5'],
      legend: {
        show: false,
      },
      grid: {
        borderColor: 'rgba(0,0,0,.2)',
        strokeDashArray: 3,
        yaxis: {
          lines: {
            show: true
          }
        },
        xaxis: {
          lines: {
            show: true
          }
        },
      },
      xaxis: {
        type: 'category',
        categories: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo'

        ]
      },
      tooltip: {
        theme: 'light',
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      }
    };
  }); */
  }

  venta: any;
  ventaLabels!: string[];
  ventaData: number[] | undefined;

  public barChartData: any[] | undefined;
  public barChartLabels: string[] | undefined;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  /*  ngOnInit() {
     this._analisis.dataProducto().subscribe(res => {
       this.list = res;
       let analisis: any = [];
       analisis = res;
       console.log(analisis);
 
       const compra = this.list.id_compras;
       const prod = this.list.producto;
       const analisisDays: string[] = [];
 
       allDays.forEach((result: any) => {
         let jsDates = new Date(result * 1000);
         let options = {
           weekday: "long",
           month: "short",
           day: "numeric"
         };
 
         analisisDays.push(jsDates.toLocaleTimeString("es", options));
 
 
         this.chart = new Chart("canvas", {
           type: "bar",
           data: {
             datasets: [
               {
                 label: "Productos",
                 data: analisis,
                 backgroundColor: [
                   "#1976D2",
                   "#1976D2",
                   "#1976D2",
                   "#1976D2",
                   "#1976D2",
                   "#1976D2",
                   "#1976D2"
                 ],
                 fill: false
               }
             ]
           },
           options: {
             legend: {
               display: false
             },
             scales: {
               xAxes: [{
                 display: true
               }],
               yAxes: [{
                 display: true
               }]
             }
           }
 
         })
 
       }); */




  ngOnInit() {
    this._analisis.dataProducto()
      .subscribe(res => {
        // console.log(res['page']['data']);
        const localChartData = this.getChartData(res);
        this.barChartLabels = localChartData.map(x => x[0]).reverse();
        this.barChartData = [{ 'data': localChartData.map(x => x[1]), 'label': 'Ganancias' }];

      });
  }

  getChartData(res: Response) {
    this.venta = res;
    const data = this.venta.map(o => o.pagototal);

    const formattedProd = this.venta.reduce((r, e) => {
      r.push([moment(e.fecha).format('YY-MM-DD'), e.pagototal]);
      return r;
    }, []);

    const p: any = [];

    const chartData = formattedProd.reduce((r, e) => {
      const key = e[0];
      if (!p[key]) {
        p[key] = e;
        r.push(p[key]);
      } else {
        p[key][1] += e[1];
      }
      return r;
    }, []);

    return chartData;
  }
}





