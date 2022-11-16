import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {

  constructor(private _http: HttpClient) { }

  dataProducto() {
    const urlAPI = 'http://127.0.0.1:8000/api/compras';
    return this._http.get(urlAPI)
      .map(res => res);
  }
}
