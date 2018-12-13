import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ProductsserviceService } from '../services/productsservice.service';
import { Router } from '@angular/router';
//import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
 })
 export class ProductsComponent implements OnInit {
  //services
  optionsformat = this.service.getFormat();
  optionsseccion = this.service.getSeccion();
  //private toasterService: ToasterService;
  
  mainproducts = {
    actions: {
      columnTitle: 'Acciones',
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
     idProduct: {
      title: 'Producto',
      filter: false,
        type: 'text',
          },
      format: {
      title: 'Formato de carga',
      filter: false,
      editor: {
        type: 'list',
        config: {
          list: this.optionsformat
        }
      }
    },
    seccion: {
      title: 'Tipo del producto',
      filter: false,
      editor: {
        type: 'list',
        config: {
          list: this.optionsseccion
        }
      }
    },
      volumentotal: {
        title: 'Volumen Total',
        filter: false,
        type: 'text',
      },
      anchoproducto: {
        title: '¿Como de ancho es el producto(cm)?',
        filter: false,
        type: 'text',
      },
      altoproducto: {
        title: '¿Como de alto es el producto(cm)?',
        filter: false,
        type: 'text',
      },
      largoproducto: {
        title: '¿Como de largo es el producto(cm)?',
        filter: false,
        type: 'text'
      },
      stock: {
        title: 'Stock',
        filter: false,
        type: 'text'
      },
      facing: {
        title: 'Facing',
        filter: false,
        type: 'text'
      },
    } 
   }
  

  /* public config: ToasterConfig = new ToasterConfig({
    tapToDismiss: false,
    positionClass: 'toast-center'
  });*/

  source: LocalDataSource;
  dataproducts;

  constructor(private service: ProductsserviceService,
    //toasterService: ToasterService,
    private router: Router) { 
    this.source = new LocalDataSource(this.service.getDataProducts()); //create the source
    //this.toasterService = toasterService;
  }
    
  ngOnInit() {
  }

  onDeleteProduct(event) {
    //console.log("Delete Event In Console")
  if (window.confirm('Estás seguro de eliminar el producto?')) {
      event.confirm.resolve(event.dataproducts);
      this.service.deleteProduct(event.dataproducts);
      //this.toasterService.pop('success', 'Success', 'Ha borrado su producto satisfactoriamente');
    } else {
      event.confirm.reject();
      //this.toasterService.pop('error', 'Error', 'Vuelva a intentarlo por favor'); 
    }
  }


  onEditProduct(event) {
    if (window.confirm('Estás seguro de modificar el producto?')) {
      event.confirm.resolve(event.newData);
      this.service.editProduct(event.newData);
      //this.toasterService.pop('success', 'Success', 'Ha borrado su producto satisfactoriamente');
    } else {
      event.confirm.reject();
      //this.toasterService.pop('error', 'Error', 'Vuelva a intentarlo por favor'); 
    }
  }

  onCreateProduct(event) {
    if (window.confirm('Estás seguro de añadir el producto?')) {
      event.confirm.resolve(event.newData);
      this.service.addProduct(event.newData);
      //this.toasterService.pop('success', 'Success', 'Ha borrado su producto satisfactoriamente');
    } else {
      event.confirm.reject();
      //this.toasterService.pop('error', 'Error', 'Vuelva a intentarlo por favor'); 
    }
  }

  viewOutput() {
    this.router.navigate(["Output"]);
  }
}

