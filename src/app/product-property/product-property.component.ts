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
  optionsref = this.service.getRefrigerado();
 optionsvar = this.service.getVariablelog();

  dataproductos = [];

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
    cod_prod: {
      title: 'ID Producto',
      filter: false,
      type: 'number',
          },
    descripcion: {
      title: 'Producto',
      filter: false,
      type: 'text'
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
    refrigerado: {
      title: '¿El producto es refrigerado o no?',
      filter: false,
      editor: {
        type: 'list',
        config: {
          list: this.optionsref
        }
      }
    },
    variable_logistica_alm: {
      title: '¿Cómo quiere almacenar su producto?',
      filter: false,
      editor: {
        type: 'list',
        config: {
          list: this.optionsvar
        }
      }
    },
      ancho_alm: {
        title: '¿Como de ancho es el producto en el almacen(cm)?',
        filter: false,
        type: 'number',
      },
      alto_alm: {
        title: '¿Como de alto es el producto en el almacen(cm)?',
        filter: false,
        type: 'number',
      },
      largo_alm: {
        title: '¿Como de largo es el producto en el almacen(cm)?',
        filter: false,
        type: 'number'
      },
      volumen_alm: {
        title: 'Volumen en el almacen',
        filter: false,
        type: 'number',
        //value: this.volumenproducto,
        editable: false,
        addable: false
      },
      area_alm: {
        title: 'Area en el almacen',
        filter: false,
        type: 'number',
       // value:this.areaproducto,
        editable: false,
        addable: false
      },
    }
   }

   source: LocalDataSource = new LocalDataSource();
   sourceOutput: LocalDataSource = new LocalDataSource();
   ngOnInit() {
    this.service.getProductos();

    /*this.service.getProductos().subscribe(dataProductos => {
      console.log('aaaaaaaaaaaaaaaaaa');
      console.log(dataProductos);
     
      if (dataProductos != null) {
        console.log(dataProductos);
       // this.dataProductos = dataProductos;
       //    this.service.setProductos(dataProductos);
        
      //   const loadData = new Array();
      //  this.source.load(loadData);
      //   this.loadContentOutputTable();
      }
    }); */

 /* this.service.getProductos().subscribe((dataProductos: productos[]) => {
    this.productos = productos;

    this.service.getProductos().subscribe(dataProductos => {
      if (dataProductos != null) {
        this.dataProductos = dataProductos;
        this.service.setProductos(dataProductos);
        
        const loadData = new Array();
        this.source.load(loadData);
        this.loadContentOutputTable();
      }
    });
  }); */

  
}

 


  constructor(private service: ProductPropertyService,
    private toastrService: NbToastrService,
    private router: Router) {
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
        this.service.RemoveProducto(event.dataproducts);
      } else {
        event.confirm.reject(); 
      }
    }
 
    private index0: number = 0; 
    result0:boolean;
  
  validardata0(newData) {
    if (!isNaN(Number(newData.ancho_alm)) &&
    !isNaN(Number(newData.alto_alm)) &&
    !isNaN(Number(newData.largo_alm)) &&
    newData.cod_prod.length !== 0 &&
    newData.descripcion.length !== 0 &&
    newData.seccion.length !== 0 &&
    newData.refrigerado.length !== 0 &&
    newData.variable_logistica_alm.length !== 0 &&
    newData.ancho_alm.length !== 0 &&
    newData.alto_alm.length !== 0 &&
    newData.largo_alm.length !== 0) {
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
        this.service.UpdateProducto(event.newData);
      } else {
        event.confirm.reject();
      }
    }
 
    private index: number = 0; 
    result:boolean;
  
  validardata(newData) {
    if (!isNaN(Number(newData.ancho_alm)) &&
    !isNaN(Number(newData.alto_alm)) &&
    !isNaN(Number(newData.largo_alm)) &&
    newData.cod_prod.length !== 0 &&
    newData.descripcion.length !== 0 &&
    newData.seccion.length !== 0 &&
    newData.refrigerado.length !== 0 &&
    newData.variable_logistica_alm.length !== 0 &&
    newData.ancho_alm.length !== 0 &&
    newData.alto_alm.length !== 0 &&
    newData.largo_alm.length !== 0) {
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
  
  