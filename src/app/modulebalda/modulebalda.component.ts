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

  modulefeatures = {   
    actions: {
      columnTitle: 'Modulos',
      add: false,
      delete: false,
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
      IDModulo: {    
        title: 'ID del módulo:',
        filter: false,
        type: 'number',
      },
      NLineal: {    
        title: 'Lineal al que pertenece:',
        filter: false,
        type: 'number',
      },
      Orden: {    
        title: 'Orden:',
        filter: false,
        type: 'number',
      },
    }
  }
    baldasfeatures = {     
      actions: {
        columnTitle: 'Baldas',
        add: false,
        delete: false,
        //edit: false
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true
      },
      columns: {
        IDBalda: {    
          title: 'ID de la balda:',
          filter: false,
          type: 'text',
        },
        Modulo: {
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

  private index0: number = 0; 
  
    result0:boolean;
    validardata0(newData) {
      if (!isNaN(Number(newData.NLineal)) &&
      !isNaN(Number(newData.Orden)) &&
      newData.IDModulo.length !== 0 &&
      newData.NLineal.length !== 0 &&
      newData.Orden.length !== 0){
        return true;
      } 
        return false;   
        }
  
    onEditModuloFeature(event) {
      this.result0 = this.validardata0(event.newData);
      if (this.result0 == false){
        
         this.toastrService.show(
           'Rellena todos los campos con el formato correcto para editar el lineal',
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
    validardata1(newData) {
      if (!isNaN(Number(newData.Modulo)) &&
      newData.IDBalda.length !== 0 &&
      newData.Modulo.length !== 0){
        return true;
      } 
        return false;   
        }
  
    onEditBaldaFeature(event) {
      this.result1 = this.validardata1(event.newData);
      if (this.result1 == false){
        
         this.toastrService.show(
           'Rellena todos los campos con el formato correcto para editar el lineal',
           `Toaster numero: ${++this.index1}`,
           );
    }else if  (window.confirm('Estás seguro de modificar la balda?')) {
        event.confirm.resolve(event.newData);
        this.service.editBaldaFeature(event.newData);
      } else {
        event.confirm.reject();
      }
    }

}
