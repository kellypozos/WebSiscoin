import { Component, AfterViewInit, ViewChild, OnInit, Inject, Optional, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AddProductoComponent } from '../apps/productos/add-producto/add-producto.component';
import { RestService } from '../services/rest.service';
import { Productos } from '../apps/interfaces/productos';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ClienteService } from 'src/app/services/cliente.service';
import {Clientes} from '../authentication/interfaces/clientes'


export interface ExampleTab {
  label: string;
  content: string;
}
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

    //public listEmpleados: any = [];
    public listClientes: any = [];

    constructor(
        public dialog: MatDialog, 
        public datePipe: DatePipe,
        private RestService: RestService,
        private router: Router,
        private clienteService: ClienteService
    ) { }

    editarForm = new FormGroup({
        id_clientesmovil: new FormControl (''),
        usuario: new FormControl (''),
        correo: new FormControl(''),
        telefono: new FormControl('')
    });

    ngOnInit(): void {
        this.cargarData();
    }

    public cargarData() {
        this.RestService.get(` http://127.0.0.1:8000/api/clientes`).subscribe(respuesta => {
            console.log(respuesta);
            this.listClientes = respuesta;
        })
    }
  }
  




