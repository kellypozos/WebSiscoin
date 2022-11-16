import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';

import { RestService } from '../../services/rest.service';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.scss']
})
export class AgregarEmpleadoComponent {

  public form: FormGroup = Object.create(null);

  empleado: FormGroup = this.fb.group({
    id_empleado: [''],
    nombre: ['', Validators.required],
    apellido_p: ['', Validators.required],
    apellido_m: ['', Validators.required],
    telefono: ['', Validators.required, Validators.maxLength(10)],
    correo: ['', Validators.required, Validators.email],
    sueldo: ['', Validators.required],
    id_empresa: ['', Validators.required]
  });

  public listEmpleados: any = [];


  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    public RestService: RestService
  ) { }

  campoNoValido(campo: string) {
    return this.empleado.get(campo)?.invalid && this.empleado.get(campo)?.touched;
  }


  insertData() {
    console.log(this.empleado.value);

    this.empleadoService.insertData(this.empleado.value).subscribe(res => {
      console.log(res);
      window.location.reload();
    })
  }

  public cargarData() {
    this.RestService.get(` http://127.0.0.1:8000/api/empleados`).subscribe(respuesta => {
      console.log(respuesta);
      this.listEmpleados = respuesta;

    })
  }

}
