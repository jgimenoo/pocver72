import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ProductPropertyService } from '../services/product-property.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme'

@Component({
  selector: 'app-product-property',
  templateUrl: './product-property.component.html',
  styleUrls: ['./product-property.component.css']
})
export class ProductPropertyComponent implements OnInit {

  //servicios
  optionstipo = this.service.getSection();

  features = {
    actions: {
      columnTitle: 'Características del producto',
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
    seccion: {
      title: 'Categoría del producto',
      filter: false,
      editor: {
        type: 'list',
        config: {
          list: this.optionstipo
        }
      }
    },
      anchoproducto: {
        title: '¿Como de ancho es el producto(cm)?',
        filter: false,
        type: 'number',
      },
      altoproducto: {
        title: '¿Como de alto es el producto(cm)?',
        filter: false,
        type: 'number',
      },
      largoproducto: {
        title: '¿Como de largo es el producto(cm)?',
        filter: false,
        type: 'number'
      },
      volumentotal: {
        title: 'Volumen Total',
        filter: false,
        type: 'number',
        //value: this.volumenproducto,
        editable: false,
        addable: false
      },
      area: {
        title: 'Area del producto',
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

  constructor(private service: ProductPropertyService,
    private toastrService: NbToastrService,
    private router: Router) {
      this.source = new LocalDataSource(this.service.getDataProducts()); //create the source
     }

  ngOnInit() {
 }

 /*function calcular() {
  // obtenemos todas las filas del tbody
  var filas=document.querySelectorAll("features tbody tr");

  var total=0;

  // recorremos cada una de las filas
  filas.forEach(function(e) {

      // obtenemos las columnas de cada fila
      var columnas=e.querySelectorAll("td");

      // obtenemos los valores de la cantidad y importe
      var cantidad=parseFloat(columnas[1].textContent);
      var importe=parseFloat(columnas[2].textContent);

      // mostramos el total por fila
      columnas[3].textContent=(cantidad*importe).toFixed(2);

      total+=cantidad*importe;
  });

  // mostramos la suma total
  var filas=document.querySelectorAll("#miTabla tfoot tr td");
  filas[1].textContent=total.toFixed(2);
 }*/
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
    if (!isNaN(Number(newData.anchoproducto)) &&
    !isNaN(Number(newData.altoproducto)) &&
    !isNaN(Number(newData.largoproducto)) &&
    newData.idProduct.length !== 0 &&
    newData.productname.length !== 0 &&
    newData.seccion.length !== 0 &&
    newData.anchoproducto.length !== 0 &&
    newData.altoproducto.length !== 0 &&
    newData.largoproducto.length !== 0) {
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
    if (!isNaN(Number(newData.anchoproducto)) &&
    !isNaN(Number(newData.altoproducto)) &&
    !isNaN(Number(newData.largoproducto)) &&
    newData.idProduct.length !== 0 &&
    newData.productname.length !== 0 &&
    newData.seccion.length !== 0 &&
    newData.anchoproducto.length !== 0 &&
    newData.altoproducto.length !== 0 &&
    newData.largoproducto.length !== 0) {
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
  
  