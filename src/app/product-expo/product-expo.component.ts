import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ProductExpoService } from '../services/product-expo.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme'
@Component({
  selector: 'app-product-expo',
  templateUrl: './product-expo.component.html',
  styleUrls: ['./product-expo.component.css']
})
export class ProductExpoComponent implements OnInit {
//servicios
optionsTipolineal = this.service.getTipo();
optionsApilamiento = this.service.getLineal();
optionsAlmacenaje = this.service.getAlmacen();

features = {
  actions: {
    columnTitle: 'Exposicion del Producto',
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
    title: 'ID Producto',
    filter: false,
    type: 'number',
        },
  productname: {
    title: 'Producto',
    filter: false,
    type: 'number'
  },
  stock: {
    title: 'Unidades',
    filter: false,
    type: 'number'
 
  },
  almacenaje: {
    title: '¿Cómo desea almacenar su producto?',
    filter: false,

    editor: {
      type: 'list',
      config: {
        list: this.optionsAlmacenaje
      }
    }
  },
    tipolineal: {
      title: '¿Qué tipo de lineal se utilizará?',
      filter: false,

      editor: {
        type: 'list',
        config: {
          list: this.optionsTipolineal
        }
      }
    },
    apilamiento: {
      title: '¿Cómo desea apilar su producto?',
      filter: false,

      editor: {
        type: 'list',
        config: {
          list: this.optionsApilamiento
        }
      }
    },
    facingmin: {
      title: 'Facing Mínimo',
      filter: false,
      type: 'number',
      editable: 'false'
    },
  }
}

 source: LocalDataSource;
 dataproducts;

constructor(private service: ProductExpoService,
  private toastrService: NbToastrService,
  private router: Router) {
    this.source = new LocalDataSource(this.service.getDataEProducts()); //create the source
   }
   ngOnInit() {
  }
   onDeleteProduct(event) {
    //console.log("Delete Event In Console")
  if (window.confirm('Estás seguro de eliminar el producto?')) {
      event.confirm.resolve(event.dataproducts);
      this.service.deleteEProduct(event.dataproducts);
    } else {
      event.confirm.reject(); 
    }
  }

  private index0: number = 0; 
  result0:boolean;

validardata0(newData) {
  if (!isNaN(Number(newData.facingmin)) &&
  !isNaN(Number(newData.stock)) &&
  newData.idProduct.length !== 0 &&
  newData.productname.length !== 0 &&
  newData.stock.length !== 0 &&
  newData.almacenaje.length !== 0 &&
  newData.tipolineal.length !== 0 &&
  newData.apilamiento.length !== 0 &&
  newData.facingmin.length !== 0) {
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
      this.service.editEProduct(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  private index: number = 0; 
  result:boolean;

validardata(newData) {
  if (!isNaN(Number(newData.facingmin)) &&
  !isNaN(Number(newData.stock)) &&
  newData.idProduct.length !== 0 &&
  newData.productname.length !== 0 &&
  newData.stock.length !== 0 &&
  newData.almacenaje.length !== 0 &&
  newData.tipolineal.length !== 0 &&
  newData.apilamiento.length !== 0 &&
  newData.facingmin.length !== 0) {
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
   this.service.addEProduct(event.newData);
 } else {
   event.confirm.reject();
 }
}
  viewOutput() {
    this.router.navigate(["Output"]);
  }
}

