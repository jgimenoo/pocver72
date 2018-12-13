import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { DistribucionService } from '../services/distribucion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distribucion',
  templateUrl: './distribucion.component.html',
  styleUrls: ['./distribucion.component.css']
})
export class DistribucionComponent implements OnInit {
//services

optionssecciondistri = this.service.getSecDistri();
optionszonasec = this.service.getZonaSec();
optionstipolineal = this.service.getTipoLineal();

distribution = {
  actions: {
    columnTitle: 'Zonas, secciones y lineales',
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

  seccionest: {
    title: 'Tipo de Seccion',
    filter: false,
    editor: {
      type: 'list',
      config: {
        list: this.optionssecciondistri
      }
    }
  },
  zonasec: {
    title: '¿En que zona se encuentra su seccion?',
    filter: false,
    editor: {
      type: 'list',
      config: {
        list: this.optionszonasec
      }
    }
  },
    cantlineales: {
      title: '¿Cuantos lineales se requieren?',
      filter: false,
      type: 'number',
    },
    tipolineal: {
      title: '¿Que tipo de lineales requieren dicha seccion?',
      filter: false,
      editor: {
        type: 'list',
        config: {
          list: this.optionstipolineal
        }
      }
    },
  }
}
 source: LocalDataSource;
 datadistribution;

  constructor(private service: DistribucionService,
    private router: Router) {
      this.source = new LocalDataSource(this.service.getDistribution()); //create the source
     }

  ngOnInit() {
  }
  onDeleteDistri(event) {
    //console.log("Delete Event In Console")
  if (window.confirm('Estás seguro de eliminar esta informacion?')) {
      event.confirm.resolve(event.data);
      this.service.deleteDistribution(event.data);
    } else {
      event.confirm.reject();
    }
  }


  onEditDistri(event) {
    if (window.confirm('Estás seguro de modificar esta informacion?')) {
      event.confirm.resolve(event.newData);
      this.service.editDistribution(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateDistri(event) {
    if (window.confirm('Estás seguro de añadir esta informacion?')) {
      event.confirm.resolve(event.newData);
      this.service.addDistribution(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  viewOutput() {
    this.router.navigate(["Output"]);
  }
  
 }

