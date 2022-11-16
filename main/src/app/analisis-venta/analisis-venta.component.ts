import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';

@Component({
  selector: 'app-analisis-venta',
  templateUrl: './analisis-venta.component.html',
  styleUrls: ['./analisis-venta.component.scss']
})
export class AnalisisVentaComponent implements OnInit {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    barThickness: 10
  };

  public barChartLabels: string[] = [
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017'
  ];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Iphone 8' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Iphone X' }
  ];
  public barChartColors: Array<any> = [
    { backgroundColor: '#1976d2' },
    { backgroundColor: '#26dad2' }
  ];
  // Doughnut
  public doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales'
  ];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType = 'doughnut';

  // Radar
  public radarChartLabels: string[] = [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ];
  public radarChartData: any = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Producto 1' }
  ];
  public radarChartType = 'radar';
  public radarChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(25,118,210,0.5)',
      borderColor: 'rgba(25,118,210,1)'
    },
    {
      backgroundColor: 'rgba(38,218,210,0.5)',
      borderColor: 'rgba(38,218,210,1)'
    }
  ];

  // lineChart
  public lineChartData: Array<any> = [
    { data: [65, 39, 80, 15, 76, 35, 40], label: 'Producto 1' }
  ];
  public lineChartLabels: Array<any> = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio'
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

  public randomize(): void {
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
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;

  }

  constructor(private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
  }

  generatePDF() {
    const pdf = new PdfMakeWrapper();

    pdf.add(
      //aqui son definiciones por lo tanto puede ser txt, img, etc
      new Txt(`Análisis de ventas

      De acuerdo con el análisis que se muestra en la gráfica se recomienda que para el próximo mes hagas... `).bold().end



    );
    pdf.create().open();
  }

  downloadPDF() {
    const pdf = new PdfMakeWrapper();

    pdf.add(
      //aqui son definiciones por lo tanto puede ser txt, img, etc
      new Txt(`Análisis de ventas
      De acuerdo con el análisis que se muestra en la gráfica se recomienda que para el próximo mes hagas...
  `).bold().end
    );
    pdf.create().download();
  }
}
