import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { AreatiendaService } from '../services/areatienda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areatienda',
  templateUrl: './areatienda.component.html',
  styleUrls: ['./areatienda.component.css']
})
export class AreatiendaComponent implements OnInit {
  
  features = {
    actions: {
      columnTitle: 'Area de la Tienda',
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
    largo: {    
      title: 'Largo de la Tienda(m)',
      filter: false,
      type: 'number',
    },
    ancho: {
      title: 'Ancho de la tienda(m)',
      filter: false,
        type: 'number',
    }
  }
}

  source: LocalDataSource;
  featureshops;

  constructor(private service: AreatiendaService,
    private router: Router) {    
      this.source = new LocalDataSource(this.service.getFeatureShops()); //create the source
    }

  ngOnInit() {
  }
  onDeleteShopFeature(event) {
  if (window.confirm('Estás seguro de eliminar la tienda?')) {
      event.confirm.resolve(event.data);
      this.service.deleteShopFeature(event.data);
    } else {
      event.confirm.reject();
    }
  }


  onEditShopFeature(event) {
    if (window.confirm('Estás seguro de modificar la tienda?')) {
      event.confirm.resolve(event.newData);
      this.service.editShopFeature(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateShopFeature(event) {
    if (window.confirm('Estás seguro de añadir la tienda?')) {
      event.confirm.resolve(event.newData);
      this.service.addShopFeature(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  viewOutput() {
    this.router.navigate(["Output"]);
  }
}
