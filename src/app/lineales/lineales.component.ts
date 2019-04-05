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
  optionszonal = this.service.getzona0();
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
      cod_lineal: {    
        title: 'Lineal número:',
        filter: false,
        type: 'number',
      },
      cod_zona: {    
        title: 'Codigo de la Zona:',
        filter: false,
        type: 'number',
      },
      descripcion: {
        title: '¿A qué zona pertenece el lineal?',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.optionszonal
          }
        }    
      },
      refrigerado: {
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

//Tabla datos 
  datacomponents = {     
    actions: {
      columnTitle: 'Datos Coeficientes',
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
  source1: LocalDataSource;
  source2: LocalDataSource;

  constructor(private service: LinealesService,
    private router: Router,
    private toastrService: NbToastrService) { 
      this.source1 = new LocalDataSource(this.service.getdatavalores()); //create the source
      this.source2 = new LocalDataSource(this.service.getdatalineales());
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
      if (!isNaN(Number(newData.cod_lineal)) &&
      newData.cod_lineal.length !== 0 &&
      newData.cod_zona.length !== 0 &&
      newData.descripcion.length !== 0 &&
      newData.refrigerado.length !== 0){
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
      if (!isNaN(Number(newData.cod_lineal)) &&
      newData.cod_lineal.length !== 0 &&
      newData.cod_zona.length !== 0 &&
      newData.descripcion.length !== 0 &&
      newData.refrigerado.length !== 0){
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
