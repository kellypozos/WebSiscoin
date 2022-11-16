import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Productos } from '../interfaces/productos';
import { ProductoService } from 'src/app/services/producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { subscribeOn } from 'rxjs/operators';
@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {
  producto: any;
  bandera: boolean = false;
  rows: any = [];
  temp: any = [];
  loadingIndicator = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public productoService: ProductoService

  ) { }


  /* datosProducto: Productos = {
    id_producto: '',
    producto: '',
    cantidad: '',
    precio_c: '',
    precio_v: '',
    imagePath: '',
    id_empresa: ''
  }; */



  editarForm = new FormGroup({
    producto: new FormControl(''),
    cantidad: new FormControl(''),
    precio_c: new FormControl(''),
    precio_v: new FormControl(''),
    imagePath: new FormControl(''),
    descripcion: new FormControl(''),
    id_producto: new FormControl(''),
  });

  ngOnInit(): void {
    let productoid = this.activatedRoute.snapshot.paramMap.get('id');
    this.productoService.getOne(productoid).subscribe(data => {
      //  this.datosProducto = data[0];
      //console.log(data)
      this.editarForm.setValue({
        'producto': data.producto,
        'cantidad': data.cantidad,
        'precio_c': data.precio_c,
        'precio_v': data.precio_v,
        'imagePath': data.imagePath,
        'descripcion': data.descripcion,
        'id_producto': productoid
      });
      console.log(this.editarForm.value);

    })
  }

  postForm(form: Productos) {
    console.log(form);
    this.productoService.putProducto(form).subscribe(data => {
      console.log(data);
      window.location.reload();
    })

  }


}