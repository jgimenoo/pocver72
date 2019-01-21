import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ZonasyseccionesService } from '../services/zonasysecciones.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme'

@Component({
  selector: 'app-zonasysecciones',
  templateUrl: './zonasysecciones.component.html',
  styleUrls: ['./zonasysecciones.component.css']
})
export class ZonasyseccionesComponent implements OnInit {

  //Tabla zonas
  //servicios tabla zona
  optionssino = this.service.getSiNo();
  zonefeat = {   
    actions: {
      add: false,
      delete: false,
      columnTitle: 'Zonas',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    columns: {
      IDZona: {    
        title: 'ID de la Zona',
        filter: false,
        editable:true,
        type: 'number',
        addable: false
      },
      Zona: {
        title: 'Zona',
        editable:true,
        filter: false,
        type: 'number',
        addable: false
      },
      Almacensn: {
        title: '¿Contiene un almacén esta zona?',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.optionssino
          }
        }       
      } 
    }
  }  
  //Tabla secciones
  //servicios tabla secciones
  optionsseccion = this.service.getSeccion();
  seccionfeat = {   
    actions: {
      add: false,
      delete: false,
      columnTitle: 'Zonas',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    columns: {
      IDSeccion: {    
        title: 'ID de la Zona',
        filter: false,
        editable:true,
        type: 'number',
        addable: false
      },
      Seccion: {
        title: 'Zona',
        editable:true,
        filter: false,
        type: 'number',
        addable: false
      },
      Eligezona: {
        title: '¿En qué Zona desea ubicar esta sección?',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.optionsseccion
          }
        }       
      } 
    }
  } 
  source: LocalDataSource;

  constructor(private service: ZonasyseccionesService,
    private router: Router,
    private toastrService: NbToastrService) {
      this.source = new LocalDataSource(this.service.getdataZona()); //create the source
      this.source = new LocalDataSource(this.service.getdataSeccion()); //create the source
     }

  ngOnInit() {
  }
  onDeleteZoneFeature(event) {
    if (window.confirm('Estás seguro de querer eliminar la zona?')) {
        event.confirm.resolve(event.data);
        this.service.deleteZoneFeature(event.data);
      } else {
        event.confirm.reject();
      }
    }
  
    private index0: number = 0; 
  
    result0:boolean;
    validardata0(newData) {
      if (!isNaN(Number(newData.IDZona)) &&
      newData.IDZona.length !== 0 &&
      newData.Zona.length !== 0 &&
      newData.Almacensn.length !== 0){
        return true;
      } 
        return false;   
        }
  
    onEditZoneFeature(event) {
      this.result0 = this.validardata0(event.newData);
      if (this.result0 == false){
        
         this.toastrService.show(
           'Rellena todos los campos con el formato correcto para añadir la tienda',
           `Toaster numero: ${++this.index0}`,
           );
    }else if  (window.confirm('Estás seguro de modificar la zona?')) {
        event.confirm.resolve(event.newData);
        this.service.editZoneFeature(event.newData);
      } else {
        event.confirm.reject();
      }
    }

    private index1: number = 0; 
  
    result1:boolean;
    validardata1(newData) {
      if (!isNaN(Number(newData.IDZona)) &&
      newData.IDZona.length !== 0 &&
      newData.Zona.length !== 0 &&
      newData.Almacensn.length !== 0){
        return true;
      } 
        return false;   
        }
        
    onCreateZoneFeature(event) {
      this.result1 = this.validardata1(event.newData);
     if (this.result1 == false){
       
        this.toastrService.show(
          'Rellena todos los campos con el formato correcto para añadir la tienda',
          `Toaster numero: ${++this.index1}`,
          );
      }else if (window.confirm('Estás seguro de añadir la zona?')) {
        event.confirm.resolve(event.newData);
        this.service.addZoneFeature(event.newData);
      } else {
        event.confirm.reject();
      }
    }  

    onDeleteSectionFeature(event) {
      if (window.confirm('Estás seguro de eliminar la sección?')) {
          event.confirm.resolve(event.data);
          this.service.deleteSectionFeature(event.data);
        } else {
          event.confirm.reject();
        }
      }
    
      private index2: number = 0; 
    
      result2:boolean;
      validardata2(newData) {
        if (!isNaN(Number(newData.IDSeccion)) &&
        newData.IDSeccion.length !== 0 &&
        newData.Seccion.length !== 0 &&
        newData.Eligezona.length !== 0){
          return true;
        } 
          return false;   
          }
    
      onEditSectionFeature(event) {
        this.result2 = this.validardata2(event.newData);
        if (this.result2 == false){
          
           this.toastrService.show(
             'Rellena todos los campos con el formato correcto para añadir la tienda',
             `Toaster numero: ${++this.index2}`,
             );
      }else if  (window.confirm('Estás seguro de modificar las secciones?')) {
          event.confirm.resolve(event.newData);
          this.service.editSectionFeature(event.newData);
        } else {
          event.confirm.reject();
        }
      }
      private index3: number = 0; 
    
      result3:boolean;
      validardata3(newData) {
        if (!isNaN(Number(newData.IDSeccion)) &&
        newData.IDSeccion.length !== 0 &&
        newData.Seccion.length !== 0 &&
        newData.Eligezona.length !== 0){
          return true;
        } 
          return false;   
          }
          
      onCreateSectionFeature(event) {
        this.result3 = this.validardata3(event.newData);
       if (this.result3 == false){
         
          this.toastrService.show(
            'Rellena todos los campos con el formato correcto para añadir la tienda',
            `Toaster numero: ${++this.index3}`,
            );
        }else if (window.confirm('Estás seguro de añadir una sección?')) {
          event.confirm.resolve(event.newData);
          this.service.addSectionFeature(event.newData);
        } else {
          event.confirm.reject();
        }
      } 
    viewOutput() {
      this.router.navigate(["Output"]);
    }
}
