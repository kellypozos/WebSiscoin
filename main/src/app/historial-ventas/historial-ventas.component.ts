import { Component, AfterViewInit, ViewChild, OnInit, Inject, Optional, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AddVentaComponent } from './add-venta/add-venta.component';
import { RestService } from '../services/rest.service';
import { Ventas } from '../apps/interfaces/ventas';
import { Router } from '@angular/router';
import { VentasService } from 'src/app/services/ventas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Productos } from '../apps/interfaces/productos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.scss']
})
export class HistorialVentasComponent implements OnInit, AfterViewInit {
  total: number | undefined;
  public listVentas: any = [];
  public listProductos: any = [];
  constructor(
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private router: Router,
    private RestService: RestService,
    private ventaService: VentasService
  ) { }

  editarForm = new FormGroup({
    fecha: new FormControl(''),
    producto: new FormControl(''),
    cantidad: new FormControl(''),
    precio_v: new FormControl('')
  })
  ngOnInit() {
    this.cargarData();
    this.total = this.listVentas.reduce((
      acc: number,
      obj: { pagototal: number; num_visitas: number; },
    ) => acc + (obj.pagototal * obj.num_visitas),
      0);
    console.log("Total: ", this.total)
  }

  public cargarData() {
    this.RestService.get(`http://127.0.0.1:8000/api/compras`).subscribe(respuesta => {
      console.log(respuesta);
      this.listVentas = respuesta;

    })
  }

  /** Tiene el total de las ventas */
  getTotalCost(): any {
    return this.listVentas.map((t: { pagototal: number; }) => t.pagototal).reduce((acc: number, value: number) => acc + value, 0);
  }

  getTotalCost2(): any {
    return this.listVentas.map((t: { pagototal: number; num_visitas: number; }) => t.pagototal * t.num_visitas).reduce((acc: number, value: number) => acc + value, 0);
  }

 /*  getTotalCost2(): any {
    return this.listVentas.map((t: { pagototal: number; }) => t.pagototal).reduce((acc: number, value: number) => acc + value, 0);
  }
 */
  nuevoVenta() {
    this.router.navigate(['apps/agregar-venta']);
  }

  eliminar(id: any) {
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar ese producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventaService.remove(id).subscribe(
          resp => {
            console.log("exito");
            window.location.reload();
          }
        )
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado correctamente.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    })
  }

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = ['#', 'fecha', 'producto', 'metodopago', 'pagototal'];
  variableVenta = new MatTableDataSource(this.listVentas); //productos son los datos estaticos que meti en una constante
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  // downloadPDF() {
  //   const pdf = new PdfMakeWrapper();

  //   pdf.add(
  //     //aqui son definiciones por lo tanto puede ser txt, img, etc
  //     new Txt(`Historial de ventas
  //     ___
  //     ___
  //     ___
  // `).bold().end
  //   );
  //   pdf.create().download();
  // }

  ngAfterViewInit(): void {
    this.variableVenta.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.variableVenta.filter = filterValue.trim().toLowerCase();
  }

  // openDialog(action: string, obj: any): void {
  //   obj.action = action;
  //   const dialogRef = this.dialog.open(HistorialDialogContent, {
  //     data: obj
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result.event === 'Agregar') {
  //       this.addRowData(result.data);
  //     } else if (result.event === 'Actualizar') {
  //       this.updateRowData(result.data);
  //     } else if (result.event === 'Eliminar') {
  //       this.deleteRowData(result.data);
  //     }
  //   });
  // }

  // tslint:disable-next-line - Disables all
  /* addRowData(row_obj: Historial): void {
     this.dataSource.data.push({
       id: ventas.length + 1,
       fecha: new Date(),
       producto: row_obj.producto,
       cantidad: row_obj.cantidad,
       precio_v: row_obj.precio_v
 
     });
     this.dialog.open(AddVentaComponent);
     this.table.renderRows();
   }
 
   // tslint:disable-next-line - Disables all
   updateRowData(row_obj: Historial): boolean | any {
     this.dataSource.data = this.dataSource.data.filter((value: any) => {
       if (value.id === row_obj.id) {
         value.fecha = row_obj.fecha;
         value.producto = row_obj.producto;
         value.cantidad = row_obj.cantidad;
         value.precio_v = row_obj.precio_v;
       }
       return true;
     });
   }
 
   // tslint:disable-next-line - Disables all
   deleteRowData(row_obj: Historial): boolean | any {
     this.dataSource.data = this.dataSource.data.filter((value: any) => {
       return value.id !== row_obj.id;
     });
   }*/
}


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class HistorialDialogContent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<HistorialDialogContent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Ventas) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.fecha !== undefined) {
      this.joiningDate = this.datePipe.transform(new Date(this.local_data.fecha), 'yyyy-MM-dd');
    }
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = 'assets/images/users/default.png';
    }
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event: any): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }
    // tslint:disable-next-line - Disables all
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      // tslint:disable-next-line - Disables all
      this.local_data.imagePath = reader.result;
    };
  }


}