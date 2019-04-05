import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZonasyseccionesService {
  constructor(private http: HttpClient) { }
  datazona = [
    {
      cod_zona: "1",        
      descripcion: "Zona1", 
      ancho: "25",    
      alto:"20",
      tienda:"1",
      almacen_x:"50",
      almacen_y:"50",
          },
    {
      cod_zona: "2",        
      descripcion: "Zona2", 
      ancho: "15",    
      alto:"10",
      tienda:"1",
      almacen_x:"50",
      almacen_y:"50",
    },
    {
      cod_zona: "3",        
      descripcion: "Zona3", 
      ancho: "25",    
      alto:"25",
      tienda:"1",
      almacen_x:"50",
      almacen_y:"50",
    },
    {
      cod_zona: "4",        
      descripcion: "Zona4", 
      ancho: "5",    
      alto:"20",
      tienda:"1",
      almacen_x:"50",
      almacen_y:"50",
    }
  ];

    dataseccion = [
      {
        cod_seccion: "1",         
        descripcion: "Perfumeria", 
        color: "uno",     
        zona:"Zona 1",
        cod_zona:"1",
            },
      {
        cod_seccion: "2",         
        descripcion: "Alcoholes", 
        color: "otro",     
        zona:"Zona 2",
        cod_zona:"2",
      },
      {
        cod_seccion: "3",         
        descripcion: "Horno", 
        color: "otro mas",     
        zona:"Zona 2",
        cod_zona:"2",
      },
      {
        cod_seccion: "4",         
        descripcion: "Pescado", 
        color: "otro diferente",     
        zona:"Zona 3",
        cod_zona:"3",
      },
      {
        cod_seccion: "5",         
        descripcion: "Fruta y verdura", 
        color: "uno q no ha salido",     
        zona:"Zona 4",
        cod_zona:"4",
      },
      {
        cod_seccion: "6",         
        descripcion: "Carne", 
        color: "dos",     
        zona:"Zona 4",
        cod_zona:"4",
      },
    ];
    opcionesseccion=[
      {value: 'Z1', title: 'Zona 1'},
      {value: 'Z2', title: 'Zona 2'},
      {value: 'Z3', title: 'Zona 3'},
      {value: 'Z4', title: 'Zona 4'},
    ]
    getSeccion(){
      return this.opcionesseccion
    }
    getdataZona() {
      return this.datazona;
    }
    getdataSeccion() {
      return this.dataseccion;
    }
    deleteZoneFeature(event): void {
      this.http
     .post<any>(`${config.basePath}zonasysecciones/deleteZonefeat`, {  
    })
    console.log(event);
    }
    
    editZoneFeature(event) {
      this.http
        .post<any>(`${config.basePath}zonasysecciones/editZonefeat`, {
          IDZona: event.IDZona,     
          Zona: event.Zona,
          Almacensn: event.Almacensn
        })
        .subscribe();
    }
    
    addZoneFeature(event) {
      this.http
        .post<any>(`${config.basePath}zonasysecciones/addZonefeat`, {
          IDZona: event.IDZona,     
          Zona: event.Zona,
          Almacensn: event.Almacensn
        })
        .subscribe();
    }

    deleteSectionFeature(event): void {
      this.http
     .post<any>(`${config.basePath}zonasysecciones/deleteSectionfeat`, {  
    })
    console.log(event);
    }
    
    editSectionFeature(event) {
      this.http
        .post<any>(`${config.basePath}zonasysecciones/editSectionfeat`, {
          IDSeccion: event.IDSeccion,     
          Seccion: event.Seccion,
          Eligezona: event.Eligezona
        })
        .subscribe();
    }
    
    addSectionFeature(event) {
      this.http
        .post<any>(`${config.basePath}zonasysecciones/addSectionfeat`, {
          IDSeccion: event.IDSeccion,     
          Seccion: event.Seccion,
          Eligezona: event.Eligezona
        })
        .subscribe();
    }

    

}

