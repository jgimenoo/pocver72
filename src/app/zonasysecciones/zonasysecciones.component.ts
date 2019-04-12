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

  zonefeat = {   
    actions: {
      //add: false,
      //delete: false,
      columnTitle: 'Zonas',
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
      cod_zona: {    
        title: 'ID de la Zona',
        filter: false,
        editable:true,
        type: 'number',
        //addable: false
      },
      descripcion: {
        title: 'Zona',
        editable:true,
        filter: false,
        type: 'text ',
        //addable: false
      },
      ancho: {
        title: 'Ancho de la Zona',
        editable:true,
        filter: false,
        type: 'number',
        //addable: false
      },
      alto: {
        title: 'Alto de la Zona',
        editable:true,
        filter: false,
        type: 'number',
        //addable: false
      },
      tienda: {
        title: '¿A qué tienda pertenece su zona?',
        editable:true,
        filter: false,
        type: 'text',
        //addable: false
      },
/*
      almacen_x: {
        title: 'Alto del almacen',
        editable:true,
        filter: false,
        type: 'number', 
        //addable: false
      },
      almacen_y: {
        title: 'Ancho del almacen',
        editable:true,
        filter: false,
        type: 'number',
        //addable: false 
      } */ 
    }
  }  
  //Tabla secciones
  //servicios tabla secciones
  optionsseccion = this.service.getSeccion();
  seccionfeat = {   
    actions: {
      //add: false,
      //delete: false,
      columnTitle: 'Secciones',
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
      cod_seccion: {    
        title: 'ID de la Seccion',
        filter: false,
        editable:true,
        type: 'number',
        addable: false
      },
      descripcion: {
        title: 'Seccion',
        editable:true,
        filter: false,
        type: 'number',
        addable: false
      },
     /* color: {
        title: 'Color de la seccion en hexadecimal',
        editable:true,
        filter: false,
        type: 'number',
        addable: false
      },*/
      cod_zona: {
        title: 'Codigo Zona',
        editable:true,
        filter: false,
        type: 'number',
        addable: false
      }, 
      zona: {
        title: '¿En qué Zona desea ubicar esta sección?',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: this.optionsseccion
          }
        }       
      }, 
    }
  } 
  source1: LocalDataSource;
  source2: LocalDataSource;


  constructor(private service: ZonasyseccionesService,
    private router: Router,
    private toastrService: NbToastrService) {
      this.source1 = new LocalDataSource(this.service.getdataZona()); //create the source
      this.source2 = new LocalDataSource(this.service.getdataSeccion()); //create the source
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
      if (!isNaN(Number(newData.cod_zona)) &&
      !isNaN(Number(newData.alto)) &&
      !isNaN(Number(newData.ancho)) &&
      //!isNaN(Number(newData.almacen_x)) &&
      //!isNaN(Number(newData.almacen_y)) &&
      newData.cod_zona.length !== 0 &&
      newData.descripcion.length !== 0 &&
      newData.ancho.length !== 0 &&
      newData.alto.length !== 0 &&
      newData.tienda.length !== 0){
        return true;
      } 
        return false;   
        }
  
    onEditZoneFeature(event) {
      this.result0 = this.validardata0(event.newData);
      if (this.result0 == false){
        
         this.toastrService.show(
           'Rellena todos los campos con el formato correcto para editar la zona',
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
      if (!isNaN(Number(newData.cod_zona)) &&
      !isNaN(Number(newData.alto)) &&
      !isNaN(Number(newData.ancho)) &&
      //!isNaN(Number(newData.almacen_x)) &&
      //!isNaN(Number(newData.almacen_y)) &&
      newData.cod_zona.length !== 0 &&
      newData.descripcion.length !== 0 &&
      newData.ancho.length !== 0 &&
      newData.alto.length !== 0 &&
      newData.tienda.length !== 0){
        return true;
      } 
        return false;   
        }
    onCreateZoneFeature(event) {
      this.result1 = this.validardata1(event.newData);
     if (this.result1 == false){
       
        this.toastrService.show(
          'Rellena todos los campos con el formato correcto para añadir la zona',
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
        if (!isNaN(Number(newData.cod_seccion)) &&
        newData.cod_seccion.length !== 0 &&
        newData.descripcion.length !== 0 &&
        newData.zona.length !== 0 &&
        newData.color.length !== 0){
          return true;
        } 
          return false;   
          }
    
      onEditSectionFeature(event) {
        this.result2 = this.validardata2(event.newData);
        if (this.result2 == false){
          
           this.toastrService.show(
             'Rellena todos los campos con el formato correcto para editar la seccion',
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
        if (!isNaN(Number(newData.cod_seccion)) &&
        newData.cod_seccion.length !== 0 &&
        newData.descripcion.length !== 0 &&
        newData.zona.length !== 0 &&
        newData.color.length !== 0){
          return true;
        } 
          return false;   
          }
    
          
      onCreateSectionFeature(event) {
        this.result3 = this.validardata3(event.newData);
       if (this.result3 == false){
         
          this.toastrService.show(
            'Rellena todos los campos con el formato correcto para añadir la sección',
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
