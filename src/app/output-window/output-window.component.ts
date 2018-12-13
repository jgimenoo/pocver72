import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { OutputWindowService } from '../services/output-window.service';
import { Router } from '@angular/router';



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
          type: 'text',
      },
      orden: {
        title: 'Orden',
        filter: false,
          type: 'text',
      },
      apilamiento: {
        title: 'Apilamiento',
        filter: false,
        type: 'text'
      }
  }
}

  source: LocalDataSource;
  
  constructor(private service: OutputWindowService,
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


  onEditOutput(event) {
    if (window.confirm('Estás seguro de modificar el producto?')) {
      event.confirm.resolve(event.newData);
      this.service.editOutput(event.newData);
      
    } else {
      event.confirm.reject();
      
    }
  }

  onCreateOutput(event) {
    if (window.confirm('Estás seguro de añadir el producto?')) {
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