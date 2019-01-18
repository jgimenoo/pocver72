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
      IDZona: "1",        // id de la zona
      Zona: "Zona1",        // nombre de la zona
      Almacensn: "No"     //Contiene o no almacen?
          },
    {
      IDZona: "2",        // id de la zona
      Zona: "Zona2",        // nombre de la zona
      Almacensn: "Si"     //Contiene o no almacen?
    },
    {
      IDZona: "3",        // id de la zona
      Zona: "Zona3",        // nombre de la zona
      Almacensn: "No"     //Contiene o no almacen?
    },
    {
      IDZona: "4",        // id de la zona
      Zona: "Zona4",        // nombre de la zona
      Almacensn: "No"     //Contiene o no almacen?
    }
  ];
    opcionesalmacen=[
      {value: 'S', title: 'Si'},
      {value: 'N', title: 'No'},
    ]

    dataseccion = [
      {
        IDSeccion: "1",         // id de la seccion
        Seccion: "Perfumeria",  // nombre de la seccion
        Eligezona: "Zona 1"     //Zona en la que se encuentra la seccion
            },
      {
        IDSeccion: "2",        // id de la seccion
        Seccion: "Alcoholes",  // nombre de la seccion
        Eligezona: "Zona 1"    //Zona en la que se encuentra la seccion
      },
      {
        IDSeccion: "3",          // id de la seccion
        Seccion: "Horno",        // nombre de la seccion
        Eligezona: "Zona 2"      //Zona en la que se encuentra la seccion
      },
      {
        IDSeccion: "4",         // id de la seccion
        Seccion: "Pescado",     // nombre de la seccion
        Eligezona: "Zona 3"     //Zona en la que se encuentra la seccion
      },
      {
        IDSeccion: "5",              // id de la seccion
        Seccion: "Fruta y Verdura",  // nombre de la seccion
        Eligezona: "Zona 3"          //Zona en la que se encuentra la seccion
      },
      {
        IDSeccion: "6",           // id de la seccion
        Seccion: "Carne",         // nombre de la seccion
        Eligezona: "Zona 4"       //Zona en la que se encuentra la seccion
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
    getSiNo() {
      return this.opcionesalmacen;
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

