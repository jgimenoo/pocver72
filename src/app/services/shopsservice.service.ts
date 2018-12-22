import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ShopsserviceService {
  shop: any[] = [];
  constructor(private http: HttpClient) { }

  getShop() {
    return this.shop;
  }

}
