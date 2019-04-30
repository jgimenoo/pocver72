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
//
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
    
  cod_prod: {
    title: 'ID Producto',
    filter: false,
    type: 'number',
        },
  descripcion: {
    title: 'Producto',
    filter: false,
    type: 'number'
  },
  prev_ventas: {
    title: 'Unidades',
    filter: false,
    type: 'number'
  },
  variable_logistica_exp: {
    title: 'Variable logística en exposición del producto',
    filter: false,
    type: 'number'
  },

    facing_min: {
      title: 'Facing Mínimo',
      filter: false,
      type: 'number',
      editable: 'false'
    },
    cant_alm_form_exp: {
      title: 'Cantidad de exposicion por formato de almacenamiento',
      filter: false,
      type: 'number',
      editable: 'false'
    },
    ancho_exp: {
      title: '¿Como de ancho es el producto en exposicion(cm)?',
      filter: false,
      type: 'number',
    },
    alto_exp: {
      title: '¿Como de alto es el producto en exposicion(cm)?',
      filter: false,
      type: 'number',
    },
    largo_exp: {
      title: '¿Como de largo es el producto en exposicion(cm)?',
      filter: false,
      type: 'number'
    },
    volumen_exp: {
      title: 'Volumen del producto en exposicion',
      filter: false,
      type: 'number',
      //value: this.volumenproducto,
      editable: false,
      addable: false
    },
    area_exp: {
      title: 'Area del producto en exposicion',
      filter: false,
      type: 'number',
     // value:this.areaproducto,
      editable: false,
      addable: false
    },
  }
 }

 source: LocalDataSource;
 dataproducts;

constructor(private service: ProductExpoService,
  private toastrService: NbToastrService,
  private router: Router) {
    this.source = new LocalDataSource(this.service.GetProductos()); //create the source
   }
   ngOnInit() {
  }
   onDeleteProduct(event) {
    //console.log("Delete Event In Console")
  if (window.confirm('Estás seguro de eliminar el producto?')) {
      event.confirm.resolve(event.dataproducts);
      this.service.RemoveProducto(event.dataproducts);
    } else {
      event.confirm.reject(); 
    }
  }

  private index0: number = 0; 
  result0:boolean;

validardata0(newData) {
  if (!isNaN(Number(newData.facing_min)) &&
  !isNaN(Number(newData.ancho_exp)) &&
  !isNaN(Number(newData.largo_exp)) &&
  !isNaN(Number(newData.alto_exp)) &&
  !isNaN(Number(newData.volumen_exp)) &&
  !isNaN(Number(newData.area_exp)) &&
  !isNaN(Number(newData.prev_ventas)) &&
  !isNaN(Number(newData.variable_logistica_exp)) &&
  !isNaN(Number(newData.cant_alm_form_exp)) &&
  newData.cod_prod.length !== 0 &&
  newData.descripcion.length !== 0 &&
  newData.prev_ventas.length !== 0 &&
  newData.variable_logistica_exp.length !== 0 &&
  newData.facing_min.length !== 0 &&
  newData.alto_exp.length !== 0 &&
  newData.ancho_exp.length !== 0 &&
  newData.largo_exp.length !== 0 &&
  newData.volumen_exp.length !== 0 &&
  newData.area_exp.length !== 0) {
  return true;
}
    return false;   
    }
    
  onEditProduct(event) {
    this.result0 = this.validardata0(event.newData);
    if (this.result0 == false){
      
       this.toastrService.show(
         'Rellena todos los campos con el formato correcto para modificar el producto',
         `Toaster numero: ${++this.index}`,
         );
     }else if (window.confirm('Estás seguro de modificar el producto?')) {
      event.confirm.resolve(event.newData);
      this.service.UpdateProducto(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  private index: number = 0; 
  result:boolean;

validardata(newData) {
  if (!isNaN(Number(newData.facing_min)) &&
  !isNaN(Number(newData.ancho_exp)) &&
  !isNaN(Number(newData.largo_exp)) &&
  !isNaN(Number(newData.alto_exp)) &&
  !isNaN(Number(newData.volumen_exp)) &&
  !isNaN(Number(newData.area_exp)) &&
  !isNaN(Number(newData.prev_ventas)) &&
  !isNaN(Number(newData.variable_logistica_exp)) &&
  !isNaN(Number(newData.cant_alm_form_exp)) &&
  newData.cod_prod.length !== 0 &&
  newData.descripcion.length !== 0 &&
  newData.prev_ventas.length !== 0 &&
  newData.variable_logistica_exp.length !== 0 &&
  newData.facing_min.length !== 0 &&
  newData.alto_exp.length !== 0 &&
  newData.ancho_exp.length !== 0 &&
  newData.largo_exp.length !== 0 &&
  newData.volumen_exp.length !== 0 &&
  newData.area_exp.length !== 0) {
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
   this.service.InsertProducto(event.newData);
 } else {
   event.confirm.reject();
 }
}
  viewOutput() {
    this.router.navigate(["Output"]);
  }
}

