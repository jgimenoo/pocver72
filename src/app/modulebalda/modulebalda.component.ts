import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ModulebaldaService } from '../services/modulebalda.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme'
@Component({
  selector: 'app-modulebalda',
  templateUrl: './modulebalda.component.html',
  styleUrls: ['./modulebalda.component.css']
})
export class ModulebaldaComponent implements OnInit {
//servicios:
optionseccionm = this.service.getSectionm();
optionsorden = this.service.getOrden();
  modulefeatures = {   
    actions: {
      columnTitle: 'Modulos',
      //add: false,
      //delete: false,
      //edit: false
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
      cod_modulo: {    
        title: 'ID del módulo:',
        filter: false,
        type: 'number',
      },
      cod_lineal: {    
        title: 'Lineal al que pertenece:',
        filter: false,
        type: 'number',
      },
      cod_seccion: {    
        title: 'Código de la seccion a la que pertenece el módulo:',
        filter: false,
        type: 'number',
      },
      seccion:{
        title: '¿A qué sección pertenece su módulo?',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.optionseccionm
          }
        }
      },
      orden: {    
        title: '¿Escoja el orden dentro del lineal?',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.optionsorden
          }
        }
      },
    }
  }
    baldasfeatures = {     
      actions: {
        columnTitle: 'Baldas',
        //add: false,
        //delete: false,
        //edit: false
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
        cod_balda: {    
          title: 'ID de la balda:',
          filter: false,
          type: 'text',
        },
        modulo: {
          title: '¿A qué módulo pertenece?',
          filter: false,
          type: 'text',    
        },
      }
  }

  source1: LocalDataSource;
  source2: LocalDataSource;

  constructor(private service: ModulebaldaService,
    private router: Router,
    private toastrService: NbToastrService) { 
    this.source1 = new LocalDataSource(this.service.getdatamodulos()); //create the source
    this.source2 = new LocalDataSource(this.service.getdatabaldas());
    }
  ngOnInit() {
  }

  onDeleteModulo(event) {
    
    if (window.confirm('Estás seguro de eliminar el módulo?')) {
        event.confirm.resolve(event.datamodulo);
        this.service.deleteModuloFeature(event.datamodulo);
        
      } else {
        event.confirm.reject();
      
      }
    }

  private index0: number = 0; 
  
    result0:boolean;
    validardata0(newData) {
      if (!isNaN(Number(newData.cod_modulo)) &&
      !isNaN(Number(newData.cod_lineal)) &&
      !isNaN(Number(newData.cod_seccion)) &&
      !isNaN(Number(newData.orden)) &&
      newData.cod_modulo.length !== 0 &&
      newData.cod_lineal.length !== 0 &&
      newData.cod_seccion.length !== 0 &&
      newData.seccion.length !== 0 &&
      newData.orden.length !== 0){
        return true;
      } 
        return false;   
        }
  
    onEditModuloFeature(event) {
      this.result0 = this.validardata0(event.newData);
      if (this.result0 == false){
        
         this.toastrService.show(
           'Rellena todos los campos con el formato correcto para editar el modulo',
           `Toaster numero: ${++this.index0}`,
           );
    }else if  (window.confirm('Estás seguro de modificar el módulo?')) {
        event.confirm.resolve(event.newData);
        this.service.editModuloFeature(event.newData);
      } else {
        event.confirm.reject();
      }
    }

    private index1: number = 0; 
    result1:boolean;
    validardata(newData) {
    if (!isNaN(Number(newData.cod_modulo)) &&
    !isNaN(Number(newData.cod_lineal)) &&
    !isNaN(Number(newData.cod_seccion)) &&
    !isNaN(Number(newData.orden)) &&
    newData.cod_modulo.length !== 0 &&
    newData.cod_lineal.length !== 0 &&
    newData.cod_seccion.length !== 0 &&
    newData.seccion.length !== 0 &&
    newData.orden.length !== 0){
      return true;
    } 
      return false;   
      }

  onCreateModuloFeature(event) {
    this.result1 = this.validardata(event.newData);
   if (this.result1 == false){
     
      this.toastrService.show(
        'Rellena todos los campos con el formato correcto para añadir el modulo',
        `Toaster numero: ${++this.index1}`,
        );
    }else if (window.confirm('Estás seguro de añadir el modulo?')) {
      event.confirm.resolve(event.newData);
      this.service.addModuloFeature(event.newData);
      
    } else {
      event.confirm.reject();
     
    }
  }

  onDeleteBalda(event) {
    
    if (window.confirm('Estás seguro de eliminar la balda?')) {
        event.confirm.resolve(event.databaldas);
        this.service.deleteBaldaFeature(event.databaldas);
        
      } else {
        event.confirm.reject();
      
      }
    }

    private index2: number = 0;  
    result2:boolean;

    validardata1(newData) {
      if (!isNaN(Number(newData.cod_balda)) &&
      !isNaN(Number(newData.modulo)) &&
      newData.cod_balda.length !== 0 &&
      newData.modulo.length !== 0){
        return true;
      } 
        return false;   
        }
  
    onEditBaldaFeature(event) {
      this.result2 = this.validardata1(event.newData);
      if (this.result2 == false){
        
         this.toastrService.show(
           'Rellena todos los campos con el formato correcto para editar la balda',
           `Toaster numero: ${++this.index2}`,
           );
    }else if  (window.confirm('Estás seguro de modificar la balda?')) {
        event.confirm.resolve(event.newData);
        this.service.editBaldaFeature(event.newData);
      } else {
        event.confirm.reject();
      }
    }

    private index3: number = 0;  
    result3:boolean;

    validardata2(newData) {
      if (!isNaN(Number(newData.cod_balda)) &&
      !isNaN(Number(newData.modulo)) &&
      newData.cod_balda.length !== 0 &&
      newData.modulo.length !== 0){
        return true;
      } 
        return false;   
        }

    onCreateBaldaFeature(event) {
      this.result3 = this.validardata(event.newData);
     if (this.result3 == false){
       
        this.toastrService.show(
          'Rellena todos los campos con el formato correcto para añadir la balda',
          `Toaster numero: ${++this.index3}`,
          );
      }else if (window.confirm('Estás seguro de añadir la balda?')) {
        event.confirm.resolve(event.newData);
        this.service.addBaldaFeature(event.newData);
        
      } else {
        event.confirm.reject();
       
      }
    }

}
