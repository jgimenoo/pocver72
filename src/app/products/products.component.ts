import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ProductsserviceService } from '../services/productsservice.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
 })
 export class ProductsComponent implements OnInit {
  //services
  optionsformat = this.service.getFormat();
  optionsseccion = this.service.getSeccion();

  
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

  source: LocalDataSource;
  dataproducts;

  constructor(private service: ProductsserviceService,
    private toastrService: NbToastrService,
    private router: Router) { 
    this.source = new LocalDataSource(this.service.getDataProducts()); //create the source
  }
    
  ngOnInit() {
  }

  onDeleteProduct(event) {
    //console.log("Delete Event In Console")
  if (window.confirm('Estás seguro de eliminar el producto?')) {
      event.confirm.resolve(event.dataproducts);
      this.service.deleteProduct(event.dataproducts);
    } else {
      event.confirm.reject(); 
    }
  }

  private index0: number = 0; 
  result0:boolean;

validardata0(newData) {
  if (!isNaN(Number(newData.volumentotal)) &&
  !isNaN(Number(newData.anchoproducto)) &&
  !isNaN(Number(newData.altoproducto)) &&
  !isNaN(Number(newData.largoproducto)) &&
  !isNaN(Number(newData.stock)) &&
  !isNaN(Number(newData.facing)) &&
  newData.idProduct.length !== 0 &&
  newData.format.length !== 0 &&
  newData.seccion.length !== 0 &&
  newData.volumentotal.length !== 0 &&
  newData.anchoproducto.length !== 0 &&
  newData.altoproducto.length !== 0 &&
  newData.largoproducto.length !== 0 &&
  newData.stock.length !== 0 &&
  newData.facing.length !== 0){ 
  return true;
}
    return false;   
    }
    
  onEditProduct(event) {
    this.result0 = this.validardata0(event.newData);
    if (this.result0 == false){
      
       this.toastrService.show(
         'Rellena todos los campos con el formato correcto para añadir el producto',
         `Toaster numero: ${++this.index}`,
         );
     }else if (window.confirm('Estás seguro de modificar el producto?')) {
      event.confirm.resolve(event.newData);
      this.service.editProduct(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  private index: number = 0; 
  result:boolean;

validardata(newData) {
  if (!isNaN(Number(newData.volumentotal)) &&
  !isNaN(Number(newData.anchoproducto)) &&
  !isNaN(Number(newData.altoproducto)) &&
  !isNaN(Number(newData.largoproducto)) &&
  !isNaN(Number(newData.stock)) &&
  !isNaN(Number(newData.facing)) &&
  newData.idProduct.length !== 0 &&
  newData.format.length !== 0 &&
  newData.seccion.length !== 0 &&
  newData.volumentotal.length !== 0 &&
  newData.anchoproducto.length !== 0 &&
  newData.altoproducto.length !== 0 &&
  newData.largoproducto.length !== 0 &&
  newData.stock.length !== 0 &&
  newData.facing.length !== 0){ 
  return true;
}
    return false;   
    }


  onCreateProduct(event) {
  this.result = this.validardata(event.newData);
if (this.result == false){
  
   this.toastrService.show(
     'Rellena todos los campos con el formato correcto para añadir el producto',
     `Toaster numero: ${++this.index}`,
     );
 }else if (window.confirm('Estás seguro de añadir el producto?')) {
   event.confirm.resolve(event.newData);
   this.service.addProduct(event.newData);
 } else {
   event.confirm.reject();
 }
}

  viewOutput() {
    this.router.navigate(["Output"]);
  }
}


