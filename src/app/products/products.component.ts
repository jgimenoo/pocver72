import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ProductsserviceService } from '../services/productsservice.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
 })
 export class ProductsComponent implements OnInit {
  constructor(private service: ProductsserviceService,
    private router: Router) { 
    }
    
  ngOnInit() {
  }

}


