import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { LinealesService } from '../services/lineales.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme'

@Component({
  selector: 'app-lineales',
  templateUrl: './lineales.component.html',
  styleUrls: ['./lineales.component.css']
})
export class LinealesComponent implements OnInit {
//Tabla lineales
  //servicios tabla lineales
  optionsseccionl = this.service.getseccion0();
  optionslinealsino = this.service.getlinealsino();
  linealfeat = {   
    actions: {
      columnTitle: 'Lineales',
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
      NLineal: {    
        title: 'Lineal número:',
        filter: false,
        type: 'number',
      },
      Seccionlin: {
        title: '¿A qué seccion pertenece el lineal?',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.optionsseccionl
          }
        }    
      },
      Refrigerado: {
        title: '¿Requiere un lineal refrigerado?',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.optionslinealsino
          }
        }       
      } 
    }
  }  


  datamodules = {   
    actions: {
      columnTitle: 'Datos Módulos y Baldas',
      add: false,
      delete: false,
      edit: false
    },
    columns: {
      Componente: {    
        title: 'Componente:',
        filter: false,
        type: 'text',
      },
      Valor: {
        title: 'Valor',
        filter: false,
        type: 'text',    
      },
    }
  }  
  source: LocalDataSource;

  constructor(private service: LinealesService,
    private router: Router,
    private toastrService: NbToastrService) { 
      this.source = new LocalDataSource(this.service.getdatavalores()); //create the source
      this.source = new LocalDataSource(this.service.getdatatitle());
      this.source = new LocalDataSource(this.service.getdatalineales());
    }

  ngOnInit() {
  }
  onDeleteLinealFeature(event) {
    if (window.confirm('Estás seguro de querer eliminar el lineal?')) {
        event.confirm.resolve(event.data);
        this.service.deleteLinealFeature(event.data);
      } else {
        event.confirm.reject();
      }
    }
  
    private index0: number = 0; 
  
    result0:boolean;
    validardata0(newData) {
      if (!isNaN(Number(newData.NLineal)) &&
      newData.NLineal.length !== 0 &&
      newData.Seccionlin.length !== 0 &&
      newData.Refrigerado.length !== 0){
        return true;
      } 
        return false;   
        }
  
    onEditLinealFeature(event) {
      this.result0 = this.validardata0(event.newData);
      if (this.result0 == false){
        
         this.toastrService.show(
           'Rellena todos los campos con el formato correcto para añadir la tienda',
           `Toaster numero: ${++this.index0}`,
           );
    }else if  (window.confirm('Estás seguro de modificar el lineal?')) {
        event.confirm.resolve(event.newData);
        this.service.editLinealFeature(event.newData);
      } else {
        event.confirm.reject();
      }
    }

    private index1: number = 0; 
  
    result1:boolean;
    validardata1(newData) {
      if (!isNaN(Number(newData.NLineal)) &&
      newData.NLineal.length !== 0 &&
      newData.Seccionlin.length !== 0 &&
      newData.Refrigerado.length !== 0){
        return true;
      } 
        return false;   
        }
        
    onCreateLinealFeature(event) {
      this.result1 = this.validardata1(event.newData);
     if (this.result1 == false){
       
        this.toastrService.show(
          'Rellena todos los campos con el formato correcto para añadir la tienda',
          `Toaster numero: ${++this.index1}`,
          );
      }else if (window.confirm('Estás seguro de añadir el lineal?')) {
        event.confirm.resolve(event.newData);
        this.service.addLinealFeature(event.newData);
      } else {
        event.confirm.reject();
      }
    }  
}