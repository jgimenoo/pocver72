import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DistribucionService {

  constructor(private http: HttpClient) { }
  datadistribution = [
    {
      seccionest:"perfumeria",
      zonasec:"1",
      cantlineales:"2",
      tipolineal: "normal",      
    },  
    {
      seccionest:"carne",
      zonasec:"3",
      cantlineales:"8",
      tipolineal: "refrigerado",             
    }];

    LinealTipo= [
      {value: '1', title: 'Normal'},
      {value: '2', title: 'Refrigerado'},
      ];
      SecZona= [
        {value: '1', title: '1'},
        {value: '2', title: '2'},
        {value: '3', title: '3'},
        {value: '4', title: '4'},
      ];
      SecDistri=[
        {value: '1', title: 'Perfumeria'},
        {value: '2', title: 'Alcoholes'},
        {value: '3', title: 'Horno'},
        {value: '4', title: 'Pescado'}, 
        {value: '5', title: 'Fruta y verdura'},
        {value: '6', title: 'Carne'},
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