import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { RestService } from '../../services/rest.service';
import { Productos } from '../interfaces/productos';
import { ProductoService } from 'src/app/services/producto.service';
import { CustomValidators } from 'ngx-custom-validators';
export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {


  public form: FormGroup = Object.create(null);

  productoPattern: any = /^[a-zA-Z]/;
  cantPattern: any = /^[0-9]/;
  textPattern: any = /^[0-9a-zA-Z]/;


  producto: FormGroup = this.fb.group({
    id_producto: [''],
    producto: [null, Validators.compose([Validators.required, Validators.pattern(this.productoPattern), Validators.minLength(5)])],
    cantidad: [null, Validators.compose([Validators.required, Validators.pattern(this.cantPattern),Validators.min(1)])],
    precio_c: [null, Validators.compose([Validators.required, Validators.pattern(this.cantPattern), Validators.min(10)])],
    precio_v: [null, Validators.compose([Validators.required, Validators.pattern(this.cantPattern), Validators.min(10)])],
    imagePath: [null, Validators.compose([Validators.required, Validators.minLength(17)])],
    descripcion: [null, Validators.compose([Validators.required, Validators.pattern(this.textPattern), Validators.minLength(5)])],

  });

  campoNoValido(campo: string) {
    return this.producto.get(campo)?.invalid && this.producto.get(campo)?.touched;
  }

  

  ngOnInit(): void {

  }

  public listProductos: any = [];
  public formValidator: FormGroup = Object.create(null);
  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    public _router: Router,
    public _location: Location,
    public RestService: RestService
  ) {

  }
  
  insertData() {
    
    console.log(this.producto.value);
    this.productoService.insertData(this.producto.value).subscribe(res => {
      console.log(res);
      window.location.reload();

    })
  }

  public cargarData() {
    this.RestService.get(` http://127.0.0.1:8000/api/productos`).subscribe(respuesta => {
      console.log(respuesta);
      this.listProductos = respuesta;

    })
  }





}
