import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DistritiendaService {

  constructor(private http: HttpClient) { }

  datalinealdistribution = [
    {
      numodulos:"18",
      anchomodulo:"50",
      largomodulo:"200",
      altomodulo: "80",
      apilamiento:"Vertical",
      numbaldas:"20",
    },  
    {
      numodulos:"18",
      anchomodulo:"50",
      largomodulo:"200",
      altomodulo: "80",
      apilamiento:"Vertical",
      numbaldas:"20",
    }];
    Apilamiento= [
      {value: 'Vertical', title: 'Vertical'},
      {value: 'Horizontal', title: 'Horizontal'},
      ];  
      getLinealDistribution() {
        return this.datalinealdistribution;
      }  

      deleteLineal(event): void {
        this.http
       .post<any>(`${config.basePath}distritienda/deleteLineal`, {  
      })
      console.log(event);
      }
      
      editLineal(event) {
        this.http
          .post<any>(`${config.basePath}distritienda/editLineal`, {
            numodulos:event.numodulos,
            anchomodulo:event.anchomodulo,
            largomodulo:event.largomodulo,
            altomodulo: event.altomodulo,
            apilamiento:event.apilamiento,
            numbaldas:event.numbaldas,
          })
          .subscribe();
      }
      
      addLineal(event) {
        this.http
          .post<any>(`${config.basePath}distritienda/addLineal`, {
            numodulos:event.numodulos,
            anchomodulo:event.anchomodulo,
            largomodulo:event.largomodulo,
            altomodulo: event.altomodulo,
            apilamiento:event.apilamiento,
            numbaldas:event.numbaldas,
          })
          .subscribe();
        }
      
      
        getApilamiento(){
        return this.Apilamiento;
       }
}

