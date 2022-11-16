import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {Clientes} from '../authentication/interfaces/clientes'
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  datosEmpleado: Clientes = {
    id_clientesmovil: '',
    usuario: '',
    correo: '',
    telefono: '',
    id_direccion: ''
  };
 
  url: string = "http://127.0.0.1:8000/api/"

  constructor(
    private httpClient: HttpClient
  ) { } 

  
  getAll(page: number): Observable<Clientes[]> {
    let direccion = this.url + "clientes" + page;
    return this.httpClient.get<Clientes[]>(direccion);
  }
}