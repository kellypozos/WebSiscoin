import { Component, AfterViewInit, ViewChild, OnInit, Inject, Optional, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AddProductoComponent } from '../productos/add-producto/add-producto.component';
import { RestService } from '../../services/rest.service';
import { Productos } from '../interfaces/productos';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'

})

export class ProductosComponent implements OnInit, AfterViewInit {

  public listProductos: any = [];
  public page: number | undefined;
 
  ExcelData: any;

  constructor(
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private router: Router,
    private RestService: RestService,
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  editarForm = new FormGroup({
    producto: new FormControl(''),
    cantidad: new FormControl(''),
    precio_c: new FormControl(''),
    precio_v: new FormControl(''),
    imagePath: new FormControl(''),
    descripcion: new FormControl(''),
    id_producto: new FormControl('')
  });

  ngOnInit(): void {
    this.cargarData();
  }

  public cargarData() {
    this.RestService.get(` http://127.0.0.1:8000/api/productos`).subscribe(respuesta => {
      console.log(respuesta);
      this.listProductos = respuesta;
      //this.listProductos.push(this.cargarData);
    })
  }
  //Metodo para cargar el archivo 
  ReadExcel(event:any = []) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      let workBook = XLSX.read(fileReader.result,{type: "binary"});
      let sheetNames = workBook.SheetNames;
      this.listProductos = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      console.log(this.listProductos);

    }
  }

  //Metodo nuevo que crea el excel de la tabla 
  //Funciona no mover
  name = 'Excel.xlsx';
  exportToExcel() {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

  editarProducto(id: any) {
    //console.log(id);
    this.router.navigate(['apps/editar-producto', id]);


  }

  nuevoProducto() {
    this.router.navigate(['apps/agregar-producto']);

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
        this.productoService.remove(id).subscribe(
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
  displayedColumns: string[] = ['#', 'producto', 'cantidad', 'precio_c', 'precio_v', 'imagePath', 'descripcion'];
  variableProducto = new MatTableDataSource(this.listProductos); //productos son los datos estaticos que meti en una constante
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);


  ngAfterViewInit(): void {
    this.variableProducto.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.variableProducto.filter = filterValue.trim().toLowerCase();
  }



  /* openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(ProductoDialogContent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Agregar') {
        this.addRowData(result.data);
      } else if (result.event === 'Actualizar') {
        this.updateRowData(result.data);
      } else if (result.event === 'Eliminar') {
        this.deleteRowData(result.data);
      }
    });
  } */


}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-content',
  templateUrl: './dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class ProductoDialogContent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<ProductoDialogContent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Productos) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
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
export class Articulo {
  constructor(public codigo: number, public descripcion: string, public precio: number) {}
}






