import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Empleados } from '../apps/interfaces/empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  datosEmpleado: Empleados = {
    id_empleado: '',
    nombre: '',
    apellido_p: '',
    apellido_m: '',
    telefono: '',
    correo: '',
    sueldo: '',
    id_empresa: '',
  };

  url: string = "http://127.0.0.1:8000/api/"

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(page: number): Observable<Empleados[]> {
    let direccion = this.url + "empleados" + page;
    return this.httpClient.get<Empleados[]>(direccion);
  }

  getOne(id: any) {
    let direccion = this.url + "empleados/" + id;
    return this.httpClient.get<any>(direccion);
  }

  insertData(empleados: Empleados) {
    return this.httpClient.post<any>(`${this.url}empleados/`, empleados, {});
  }

  putEmpleado(form: Empleados) {
    let direccion = this.url + "empleados/" + form.id_empleado;
    return this.httpClient.put<any>(direccion, form, {});
  }

  remove(id: any) {
    return this.httpClient.delete(`${this.url}empleados/${id}`);
  }

}