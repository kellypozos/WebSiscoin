import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleados } from '../interfaces/empleados';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.scss']
})
export class EditarEmpleadoComponent implements OnInit {

  bandera: boolean = false;
  rows: any = [];
  temp: any = [];
  loadingIndicator = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public empleadoService: EmpleadoService
  ) { }

  editarForm = new FormGroup({
    nombre: new FormControl(''),
    apellido_p: new FormControl(''),
    apellido_m: new FormControl(''),
    telefono: new FormControl(''),
    correo: new FormControl(''),
    sueldo: new FormControl(''),
    id_empleado: new FormControl(''),
    id_empresa: new FormControl('')
  });

  ngOnInit(): void {
    let empleadoid = this.activatedRoute.snapshot.paramMap.get('id');
    this.empleadoService.getOne(empleadoid).subscribe(data => {
      //  this.datosProducto = data[0];
      console.log(data)
      this.editarForm.setValue({
        'nombre': data.Empleado.nombre,
        'apellido_p': data.Empleado.apellido_p,
        'apellido_m': data.Empleado.apellido_m,
        'telefono': data.Empleado.telefono,
        'correo': data.Empleado.correo,
        'sueldo': data.Empleado.sueldo,
        'id_empleado': empleadoid,
        'id_empresa': data.Empleado.id_empresa

      });
      console.log(this.editarForm.value);

    })
  }


  postForm(form: Empleados) {
    console.log(form);
    this.empleadoService.putEmpleado(form).subscribe(data => {
      console.log(data);
      window.location.reload();
    })

  }

}