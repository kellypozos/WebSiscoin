import { Injectable } from '@angular/core';
import { Ventas } from '../apps/interfaces/ventas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { id } from '@swimlane/ngx-datatable';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
    datosVenta: Ventas = {
      id_venta: '',
      fecha: '',
      producto: '',
      cantidad_vendido: '',
      precio_v: ''
    };
    url: string = "http://127.0.0.1:8000/api/"

    constructor(private httpClient: HttpClient) { }

    getAll(page: number): Observable<Ventas[]>{
        let direccion = this.url + "ventas" + page;
        return this.httpClient.get<Ventas[]>(direccion);
    }

    getOne(id: any): Observable<Ventas>{
        let direccion = this.url + "ventas/" + id;
        return this.httpClient.get<Ventas>(direccion);
    }

    insertData(ventas: Ventas) {
        return this.httpClient.post<any>(`${this.url}ventas/`, ventas, {});
    }

    putVentas(form: Ventas) {
        let direccion = this.url + "ventas/" + form.id_venta;
        return this.httpClient.put<any>(direccion, form, {});
    }

    remove(id: any) {
        return this.httpClient.delete(`${this.url}ventas/${id}`);
    }
}