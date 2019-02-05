import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EstructuraModuloService {

  BASE_URL = 'localhost:4200';

  constructor(
    public http: HttpClient) { }


    obtenerProductosModulo(idModulo: number) {
      // Sera la llamada get
      return this.http.get(this.BASE_URL + '/productosModulo/' + idModulo).pipe(map( (resp: any) => {
        return resp;
      }));
    }
}
