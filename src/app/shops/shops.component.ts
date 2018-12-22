import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ShopsserviceService } from '../services/shopsservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
  })

 export class ShopsComponent implements OnInit {
   constructor(private service: ShopsserviceService,
    private router: Router) { 
    }
  ngOnInit() {
  }
  
 }