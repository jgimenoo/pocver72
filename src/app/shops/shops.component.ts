import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ShopsserviceService } from '../services/shopsservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
  })

 export class ShopsComponent implements OnInit {

  //services

  optionsseccion = this.service.getSeccion();
  optionslineal = this.service.getLineal();
  optionszona = this.service.getZona();
  
  mainshops = {
    actions: {
      columnTitle: 'Tiendas',
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
    zona: {
      title: 'Zona',
      filter: false,
      editor:{
        type: 'list',
        config:{
          list: this.optionszona
        }
      }
    },
    seccion: {
      title: 'Seccion',
      filter: false,
      editor: {
        type: 'list',
        config: {
          list: this.optionsseccion
        }
      }
    },
    linealtipo: {
      title: 'Tipo de Lineal',
      filter: false,
      editor: {
        type: 'list',
        config: {
          list: this.optionslineal
        }
      }
    },
      moduloancho: {
        title: 'Ancho del módulo',
        filter: false,
        type: 'text',
      },
      modulolargo: {
        title: 'Largo del módulo',
        filter: false,
        type: 'text',
      },
      moduloalto: {
        title: 'Alto del módulo',
        filter: false,
        type: 'text',
      },
      numpales: {
        title: 'Numero de pales',
        filter: false,
        type: 'text',
      }
    }
  }
 
   source: LocalDataSource;
   datashops;

   constructor(private service: ShopsserviceService,
    private router: Router) { 
   this.source = new LocalDataSource(this.service.getDataShops()); //create the source
    }
  ngOnInit() {
  }
  onDeleteShop(event) {
    //console.log("Delete Event In Console")
  if (window.confirm('Estás seguro de eliminar la tienda?')) {
      event.confirm.resolve(event.data);
      this.service.deleteShop(event.data);
    } else {
      event.confirm.reject();
    }
  }


  onEditShop(event) {
    if (window.confirm('Estás seguro de modificar la tienda?')) {
      event.confirm.resolve(event.newData);
      this.service.editShop(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateShop(event) {
    if (window.confirm('Estás seguro de añadir la tienda?')) {
      event.confirm.resolve(event.newData);
      this.service.addShop(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  viewOutput() {
    this.router.navigate(["Output"]);
  }
  
 }


