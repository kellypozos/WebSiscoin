import { Component, OnInit, Inject, Optional, ViewChild, AfterViewInit, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AddComponent } from './add/add.component';
import { FormControl, FormGroup } from '@angular/forms';

import { RestService } from '../../services/rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ClienteService } from 'src/app/services/cliente.service';
import {Clientes} from '../../authentication/interfaces/clientes'


@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html'
})

 
export class EmployeeComponent implements OnInit, AfterViewInit {

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

    // editarEmpleado(id: any) {
    //     //console.log(id);
    //     this.router.navigate(['apps/editar-empleado', id]);
    
    // }

    // nuevoEmpleado() {
    //     this.router.navigate(['apps/agregar-empleado']);
    // }



    // eliminar(id: any) {
    //     Swal.fire({
    //         title: '¿Estás seguro de que quieres eliminar el empleado?',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonText: 'Si',
    //         cancelButtonText: 'No, cancelar'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           this.empleadoService.remove(id).subscribe(
    //             resp => {
    //               console.log("exito"); 
    //               window.location.reload();
    //             }
    //           )
    //           Swal.fire(
    //             '¡Eliminado!',
    //             'El empleado ha sido eliminado correctamente.',
    //             'success'
    //           )
    //         } else if (result.dismiss === Swal.DismissReason.cancel) { }
    //     })
    // }

    @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
    searchText: any;
    displayedColumns: string[] = ['usuario', 'correo', 'contrasena'];
    variableCliente = new MatTableDataSource(this.listClientes);
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

    ngAfterViewInit(): void {
        this.variableCliente.paginator = this.paginator;
    }
    
    applyFilter(filterValue: string): void {
        this.variableCliente.filter = filterValue.trim().toLowerCase();
    }

}


@Component({
    // tslint:disable-next-line: component-selector
    selector: 'dialog-content',
    templateUrl: 'dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class EmployeeDialogContent {
    action: string;
    // tslint:disable-next-line - Disables all
    local_data: any;
    selectedImage: any = '';
    joiningDate: any = '';

    constructor(
        public datePipe: DatePipe,
        public dialogRef: MatDialogRef<EmployeeDialogContent>,
        // @Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: Clientes) {
        this.local_data = { ...data };
        this.action = this.local_data.action;
        /* if (this.local_data.DateOfJoining !== undefined) {
            this.joiningDate = this.datePipe.transform(new Date(this.local_data.DateOfJoining), 'yyyy-MM-dd');
        } */
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