import { Component, OnInit } from '@angular/core';
import { ProductsserviceService } from '../services/productsservice.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string [] = ['Perfumeria', 'Alcoholes', 'Horno', 'Pescado', 'Fruta y verdura', 'Carne'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartData: any[] = this.service.getDataSeccion2();
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  } 
  constructor(private service: ProductsserviceService) {
 
     }

  ngOnInit() {
    
    

  }
}

