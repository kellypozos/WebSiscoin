import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RestService } from '../../services/rest.service';
import { Ventas } from '../interfaces/ventas';
import Swal from 'sweetalert2/dist/sweetalert2.js';
// import { Agproducto } from 'src/app/agproducto'; 
import { VentasService } from 'src/app/services/ventas.service';
export interface ExampleTab {
  label: string;
  content: string;
}
@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.component.html',
  styleUrls: ['./agregar-venta.component.scss']
})
export class AgregarVentaComponent {

  public form: FormGroup = Object.create(null);

  ventas: FormGroup = this.fb.group({
    id_venta: [''],
    fecha: ['', [Validators.required]],
    id_producto: ['', [Validators.required]],
    cantidad_vendido: ['', [Validators.required]],
    precio_v: ['', [Validators.required]],
    id_empresa: ['', [Validators.required]]
  });

  campoNoValido(campo: string) {
    return this.ventas.get(campo)?.invalid && this.ventas.get(campo)?.touched;
  }

  public listVentas: any = [];

  constructor(
    private ventaService: VentasService,
    private fb: FormBuilder,
    public _router: Router,
    public _location: Location,
    public RestService: RestService
  ) { }

  insertData() {
    console.log(this.ventas.value);
    this.ventaService.insertData(this.ventas.value).subscribe(res => {
      console.log(res);
      window.location.reload();
      try {
        console.log(res);
      } catch {

      }
    })
  }

  public cargarData() {
    this.RestService.get(` http://127.0.0.1:8000/api/ventas`).subscribe(respuesta => {
      console.log(respuesta);
      this.listVentas = respuesta;

    })
  }
}
