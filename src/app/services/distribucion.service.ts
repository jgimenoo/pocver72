import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DistribucionService {

  constructor(private http: HttpClient) { }
  datadistribution = [
    {
      seccionest:"Perfumeria",
      zonasec:"1",
      cantlineales:"2",
      tipolineal: "Normal",      
    },  
    {
      seccionest:"Carne",
      zonasec:"3",
      cantlineales:"8",
      tipolineal: "Refrigerado",             
    }];

    LinealTipo= [
      {value: 'Normal', title: 'Normal'},
      {value: 'Refrigerado', title: 'Refrigerado'},
      ];
      SecZona= [
        {value: '1', title: '1'},
        {value: '2', title: '2'},
        {value: '3', title: '3'},
        {value: '4', title: '4'},
      ];
      SecDistri=[
        {value: 'Perfumeria', title: 'Perfumeria'},
        {value: 'Alcoholes', title: 'Alcoholes'},
        {value: 'Horno', title: 'Horno'},
        {value: 'Pescado', title: 'Pescado'}, 
        {value: 'Fruta y verdura', title: 'Fruta y verdura'},
        {value: 'Carne', title: 'Carne'},
      ]


getDistribution() {
  return this.datadistribution;
}

deleteDistribution(event): void {
  this.http
 .post<any>(`${config.basePath}distribucion/deleteDistribution`, {  
})
console.log(event);
}

editDistribution(event) {
  this.http
    .post<any>(`${config.basePath}distribucion/editDistribution`, {
      seccionest:event.seccionest,
      zonasec:event.zonasec,
      cantlineales:event.cantlineales,
      tipolineal: event.tipolineal,
    })
    .subscribe();
}

addDistribution(event) {
  this.http
    .post<any>(`${config.basePath}distribucion/addDistribution`, {
      seccionest:event.seccionest,
      zonasec:event.zonasec,
      cantlineales:event.cantlineales,
      tipolineal: event.tipolineal,
    })
    .subscribe();
  }


 getSecDistri(){
  return this.SecDistri;
 }
 getZonaSec(){
  return this.SecZona;
 } 
 getTipoLineal(){
  return this.LinealTipo;
 }
}