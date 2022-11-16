import { Injectable } from '@angular/core';
import { Productos } from '../apps/interfaces/productos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { id } from '@swimlane/ngx-datatable';
@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    datosProducto: Productos = {
        id_producto: '',
        producto: '',
        cantidad: '',
        precio_c: '',
        precio_v: '',
        imagePath: '',
        descripcion: '',
        id_empresa: ''
    };

    url: string = "http://127.0.0.1:8000/api/"

    constructor(private httpClient: HttpClient) { }

    getAll(page: number): Observable<Productos[]> {
        let direccion = this.url + "productos" + page;
        return this.httpClient.get<Productos[]>(direccion);
    }

    getOne(id: any): Observable<Productos> {
        let direccion = this.url + "productos/" + id;
        return this.httpClient.get<Productos>(direccion);
    }

    insertData(productos: Productos) {
        return this.httpClient.post<any>(`${this.url}productos/`, productos, {});
    }

    putProducto(form: Productos) {
        let direccion = this.url + "productos/" + form.id_producto;
        return this.httpClient.put<any>(direccion, form, {});
    }

    remove(id: any) {
        return this.httpClient.delete(`${this.url}productos/${id}`);
    }

}
