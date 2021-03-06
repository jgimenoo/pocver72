import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { DistritiendaService } from '../services/distritienda.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme'

@Component({
  selector: 'app-distritienda',
  templateUrl: './distritienda.component.html',
  styleUrls: ['./distritienda.component.css']
})
export class DistritiendaComponent implements OnInit {
//services

optionsapilamiento = this.service.getApilamiento();

linealdistribution = {
  actions: {
    columnTitle: 'Distribucion en el lineal',
  },
  
  add: {
    addButtonContent: '<i class="nb-plus"></i>',
    createButtonContent: '<i class="nb-checkmark"></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
    confirmCreate: true,
    active: true
  },
  edit: {
    editButtonContent: '<i class="nb-edit"></i>',
    saveButtonContent: '<i class="nb-checkmark"></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
    confirmSave: true
  },
  delete: {
    deleteButtonContent: '<i class="nb-trash"></i>',
    confirmDelete: true
  },
  columns: {

  numodulos: {
    title: '¿Cuantos modulos tiene su lineal?',
    filter: false,
    type: 'number',
  },
  anchomodulo: {
    title: 'Ancho del modulo(cm)',
    filter: false,
    type: 'number',
  },
    largomodulo: {
      title: 'Largo del modulo(cm)',
      filter: false,
      type: 'number',
    },
    altomodulo: {
      title: 'Largo del modulo(cm)',
      filter: false,
      type: 'number',
    },
    apilamiento: {
      title: '¿Como quiere que se apile su producto?',
      filter: false,
      editor: {
        type: 'list',
        config: {
          list: this.optionsapilamiento
        }
      }
    },
    numbaldas: {
      title: '¿Cuantas baldas tiene su modulo?',
      filter: false,
      type: 'number',
    },
  }
}
 source: LocalDataSource;
 datalinealdistribution;
 constructor(private service: DistritiendaService,
  private toastrService: NbToastrService,
  private router: Router) {
    this.source = new LocalDataSource(this.service.getLinealDistribution()); //create the source
   }

ngOnInit() {
}
onDeleteLineal(event) {
  //console.log("Delete Event In Console")
if (window.confirm('¿Estás seguro de eliminar este lineal?')) {
    event.confirm.resolve(event.data);
    this.service.deleteLineal(event.data);
  } else {
    event.confirm.reject();
  }
}

private index0: number = 0; 
result0:boolean;

validardata0(newData) {
  if (!isNaN(Number(newData.numodulos)) &&
  !isNaN(Number(newData.anchomodulo)) &&
  !isNaN(Number(newData.largomodulo)) &&
  !isNaN(Number(newData.altomodulo)) &&
  !isNaN(Number(newData.numbaldas)) &&
  newData.numodulos.length !== 0 &&
  newData.anchomodulo.length !== 0 &&
  newData.largomodulo.length !== 0 &&
  newData.altomodulo.length !== 0 &&
  newData.apilamiento.length !== 0 &&
  newData.numbaldas.length !== 0){
    return true;
  } 
    return false;   
    }
onEditLineal(event) {
  this.result0 = this.validardata0(event.newData);
  if (this.result0 == false){
    
     this.toastrService.show(
       'Rellena todos los campos con el formato correcto para añadir la distribucion',
       `Toaster numero: ${++this.index0}`,
       );
   }else if (window.confirm('¿Estás seguro de modificar este lineal?')) {
    event.confirm.resolve(event.newData);
    this.service.editLineal(event.newData);
  } else {
    event.confirm.reject();
  }
}

private index: number = 0; 
result:boolean;

validardata(newData) {
  if (!isNaN(Number(newData.numodulos)) &&
  !isNaN(Number(newData.anchomodulo)) &&
  !isNaN(Number(newData.largomodulo)) &&
  !isNaN(Number(newData.altomodulo)) &&
  !isNaN(Number(newData.numbaldas)) &&
  newData.numodulos.length !== 0 &&
  newData.anchomodulo.length !== 0 &&
  newData.largomodulo.length !== 0 &&
  newData.altomodulo.length !== 0 &&
  newData.apilamiento.length !== 0 &&
  newData.numbaldas.length !== 0){
    return true;
  } 
    return false;   
    }

onCreateLineal(event) {
this.result = this.validardata(event.newData);
if (this.result == false){
  
   this.toastrService.show(
     'Rellena todos los campos con el formato correcto para añadir la distribucion',
     `Toaster numero: ${++this.index}`,
     );
 }else if (window.confirm('Estás seguro de añadir  esta informacion?')) {
   event.confirm.resolve(event.newData);
   this.service.addLineal(event.newData);
 } else {
   event.confirm.reject();
 }
}


viewOutput() {
  this.router.navigate(["Output"]);
}

}

