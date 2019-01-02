import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AreatiendaService {

  constructor(private http: HttpClient) { }
  featureshops = [
    {
      largo: "22",     
      ancho: "35",        
    }];

    getFeatureShops() {
      return this.featureshops;
    }
    deleteShopFeature(event): void {
      this.http
     .post<any>(`${config.basePath}areatienda/deleteShopfeat`, {  
    })
    console.log(event);
    }
    
    editShopFeature(event) {
      this.http
        .post<any>(`${config.basePath}areatienda/editShopfeat`, {
          largo: event.largo,     
          ancho: event.ancho,
        })
        .subscribe();
    }
    
    addShopFeature(event) {
      this.http
        .post<any>(`${config.basePath}areatienda/addShopfeat`, {
          largo: event.largo,     
          ancho: event.ancho,
        })
        .subscribe();
    }

}
