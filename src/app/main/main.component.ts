import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { ShopsserviceService } from '../services/shopsservice.service';
import { ProductsserviceService } from '../services/productsservice.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  products = this.productsService.getProduct();
  shops = this.shopsService.getShop();

  constructor(private shopsService: ShopsserviceService,
    private productsService: ProductsserviceService,
    private router: Router) { }

  ngOnInit() {
  }
  goToOutput(){
    this.router.navigate(["Output"]);
  }
  goToestructura(){
    this.router.navigate(["estructuratienda"])
  }
}
