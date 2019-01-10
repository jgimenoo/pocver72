import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { OutputWindowService } from '../services/output-window.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme'


@Component({
  selector: 'app-output-window',
  templateUrl: './output-window.component.html',
  styleUrls: ['./output-window.component.css']
})
export class OutputWindowComponent implements OnInit {

  settings = {
    actions: {
      columnTitle: 'Acciones'
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
      idProducto: {
        title: 'Producto',
        filter: false,
        type: 'text'
      },
      balda: {
        title: 'Balda',
        filter: false,
          type: 'number',
      },
      orden: {
        title: 'Orden',
        filter: false,
          type: 'number',
      },
      apilamiento: {
        title: 'Apilamiento',
        filter: false,
        type: 'number'
      }
  }
}

  source: LocalDataSource;
  
  constructor(private service: OutputWindowService,
             private toastrService: NbToastrService,
              private router: Router,) {
    this.source = new LocalDataSource(this.service.getDataOutput())
  
  }

  ngOnInit() {
  }

  onDeleteOutput(event) {
    
  if (window.confirm('Estás seguro de eliminar el producto?')) {
      event.confirm.resolve(event.dataproducts);
      this.service.deleteOutput(event.dataproducts);
      
    } else {
      event.confirm.reject();
    
    }
  }

  private index0: number = 0; 
  result0:boolean;
  validardata0(newData) {
    if (
    !isNaN(Number(newData.balda)) &&
    !isNaN(Number(newData.orden)) &&
    !isNaN(Number(newData.apilamiento)) &&
    newData.idProducto.length !== 0 &&
    newData.balda.length !== 0 &&
    newData.orden.length !== 0 &&
    newData.apilamiento.length !== 0){
      return true;
    } 
      return false;   
      }

  onEditOutput(event) {
        this.result0 = this.validardata0(event.newData);
    if (this.result0 == false){
      
       this.toastrService.show(
         'Rellena todos los campos con el formato correcto para añadir la distribucion',
         `Toaster numero: ${++this.index0}`,
         );
     }else if (window.confirm('Estás seguro de modificar el producto?')) {
      event.confirm.resolve(event.newData);
      this.service.editOutput(event.newData);
      
    } else {
      event.confirm.reject();
      
    }
  }

  private index: number = 0; 
  result:boolean;
  validardata(newData) {
    if (
    !isNaN(Number(newData.balda)) &&
    !isNaN(Number(newData.orden)) &&
    !isNaN(Number(newData.apilamiento)) &&
    newData.idProducto.length !== 0 &&
    newData.balda.length !== 0 &&
    newData.orden.length !== 0 &&
    newData.apilamiento.length !== 0){
      return true;
    } 
      return false;   
      }
  onCreateOutput(event) {
    this.result = this.validardata(event.newData);
   if (this.result == false){
     
      this.toastrService.show(
        'Rellena todos los campos con el formato correcto para añadir la distribucion',
        `Toaster numero: ${++this.index}`,
        );
    }else if (window.confirm('Estás seguro de añadir el producto?')) {
      event.confirm.resolve(event.newData);
      this.service.addOutput(event.newData);
      
    } else {
      event.confirm.reject();
     
    }
  }

  goBack() {
    this.router.navigate(["main"]);
  }
}