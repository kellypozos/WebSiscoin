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
import * as moment from 'moment';
import { AnalisisService } from 'src/app/services/analisis.service';
// tslint:disable-next-line: class-name
export interface newsletterchartOptions {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: any;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    colors: string[];
    markers: any;
    grid: ApexGrid;
}

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

    @ViewChild('newsletter-chart') chart3: ChartComponent = Object.create(null);
    //public newsletterchartOptions: Partial<newsletterchartOptions>;

    constructor(private _analisis: AnalisisService) {
        /*  this.newsletterchartOptions = {
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
             colors: ['#26c6da', '#1e88e5'],
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
                     'Mayo',
                     'Junio',
                     'Julio'
 
                 ]
             },
             tooltip: {
                 theme: 'light',
                 x: {
                     format: 'dd/MM/yy HH:mm'
                 }
             }
         }; */
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

    ngOnInit() {
        this._analisis.dataProducto()
            .subscribe(res => {
                // console.log(res['page']['data']);
                const localChartData = this.getChartData(res);
                this.barChartLabels = localChartData.map(x => x[0]);
                this.barChartData = [{ 'data': localChartData.map(x => x[1]), 'label': 'Producto más vendido próximamente' }];

            });
    }

    getChartData(res: Response) {
        this.venta = res;
        const data = this.venta.map(o => o.num_visitas);

        const formattedProd = this.venta.reduce((r, e) => {
            r.push([(e.producto), e.num_visitas]);
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
