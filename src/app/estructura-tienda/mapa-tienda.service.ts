import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MapaTiendaService {

  constructor(
    public http: HttpClient,
    private device: DeviceDetectorService) { }

  BASE_URL = 'localhost:4200';

  obtenerZonasTienda(idTienda: number){
    // Sera la llamada get
    return this.http.get(this.BASE_URL + '/mapaTienda/' + idTienda).pipe(map( (resp: any) => {
      return this.procesarZonasTienda(resp);
    }));
  }

  obtenerDistanciasAlmacen(zonas, zonaAlmacen) {
    zonas.forEach(zona => {
      zona.distancia = 'Media';
    });
    zonaAlmacen.distancia = 'Cerca';
    if (zonaAlmacen.id === 1) {
      zonas[3].distancia = 'Lejos';
    } else if (zonaAlmacen.id === 2) {
      zonas[2].distancia = 'Lejos';
    } else if (zonaAlmacen.id === 3) {
      zonas[1].distancia = 'Lejos';
    } else {
      zonas[0].distancia = 'Lejos';
    }
  }

  procesarZonasTienda(resp: any) {
    let sizeModulo;
    let widthZona;
    let heightZona;
    let sizeAlmacen;
    const idTienda = resp.id;
    const zonas = resp.zonas;
    const secciones = resp.secciones;
    if (this.device.isDesktop()) {
      sizeModulo = 1;
      sizeAlmacen = 1;
      widthZona = 500;
      heightZona = 400;
    } else {
      sizeModulo = 0;
      sizeAlmacen = 0;
      widthZona = 350;
      heightZona = 290;
    }
    let zonaAlmacen;
    zonas.forEach(zona => {
      zona.width = widthZona; // Revisar
      zona.height = heightZona; // Revisar
      if (zona.almacen) {
        zonaAlmacen = zona;
        zona.almacen.size = sizeAlmacen;
        zona.almacen.zona = {
          id: zona.id
        };
        zona.almacen.dd = {
          origen_x: zona.almacen.origen_x,
          origen_y: zona.almacen.origen_y
        };
        delete zona.almacen.origen_x;
        delete zona.almacen.origen_y;
      }
      zona.lineales.forEach(lineal => {
        lineal.zona = {
          id: zona.id
        };
        lineal.dd = {
          origen_x: lineal.origen_x,
          origen_y: lineal.origen_y
        };
        delete lineal.origen_x;
        delete lineal.origen_y;
        lineal.modulos.forEach(modulo => {
          modulo.zona = zona.id;
          modulo.lineal = lineal.id;
          modulo.label = lineal.id + '';
          modulo.size = sizeModulo;
          modulo.horizontal = lineal.horizontal;
          modulo.color = modulo.colorSeccion;
          delete modulo.colorSeccion;
        });
      });
    });
    this.obtenerDistanciasAlmacen(zonas, zonaAlmacen);
    return {idTienda: idTienda, zonas: zonas, secciones: secciones};
  }

  guardarMapaTienda(idTienda: number, zonas: any, secciones: any): Observable<any> {
    const url = this.BASE_URL + '/mapaTienda/' + idTienda;
    const zonasBD = [];
    zonas.forEach(zona => {
      zonasBD.push({
        id: zona.id,
        saved_width: zona.saved_width,
        saved_height: zona.saved_height,
        saved_desktop: this.device.isDesktop(),
        almacen: zona.almacen || null,
        lineales: []
      });
      const zonaBD = zonasBD[zonasBD.length - 1];
      if (zona.almacen !== null) {
        zonaBD.almacen.origen_x = zona.almacen.dd.origen_x;
        zonaBD.almacen.origen_y = zona.almacen.dd.origen_y;
      }
      zona.lineales.forEach(lineal => {
        zonaBD.lineales.push({
          id: lineal.id,
          horizontal: lineal.horizontal,
          origen_x: lineal.dd.origen_x,
          origen_y: lineal.dd.origen_y,
          modulos: []
        });
        const linealBD = zonaBD.lineales[zonaBD.lineales.length - 1];
        lineal.modulos.forEach(modulo => {
          linealBD.modulos.push({
            id: modulo.id,
            seccion: modulo.seccion,
            colorSeccion: modulo.color // Esto se deberia quitar cuando no sea mockup
          });
        });
      });
    });
    const tiendaBD = {
      id: idTienda,
      secciones: secciones,  // Esto se deberia quitar cuando no sea mockup
      zonas: zonasBD
    };
    return this.http.put(url, tiendaBD).pipe(map( (resp: any) => {
      return resp;
    }));
  }
}
