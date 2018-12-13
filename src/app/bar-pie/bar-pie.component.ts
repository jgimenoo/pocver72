import { Component, OnInit } from '@angular/core';
import { ProductsserviceService } from '../services/productsservice.service';

@Component({
  selector: 'app-bar-pie',
  templateUrl: './bar-pie.component.html',
  styleUrls: ['./bar-pie.component.css'],
})

export class BarPieComponent implements OnInit {
// Pie
public pieChartLabels:string[] = ['Perfumeria', 'Alcoholes', 'Horno', 'Pescado', 'Fruta y verdura', 'Carne'];
public pieChartData:any[] = this.service.getDataSeccion3();
public pieChartType:string = 'pie';

// events
public chartClicked(e:any):void {
  console.log(e);
}
public chartHovered(e:any):void {
  console.log(e);
}
constructor(private service: ProductsserviceService) {}
  ngOnInit() {
  }
}




