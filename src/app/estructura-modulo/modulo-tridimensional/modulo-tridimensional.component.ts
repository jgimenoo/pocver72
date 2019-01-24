import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as THREE from 'three-full';

@Component({
  selector: 'app-modulo-tridimensional',
  templateUrl: './modulo-tridimensional.component.html',
  styleUrls: ['./modulo-tridimensional.component.css']
})
export class ModuloTridimensionalComponent implements OnInit {

  @Input() modulo;
  @Input() numBaldas;
  @Input() datosBalda;
  @Input() grupoProductos;

  @ViewChild('estanteria') estanteriaRef: ElementRef;

  inicioX = 0;
  inicioY = 0;
  inicioZ = 0;
  private _finalX = 0;
  private proporcion = 3.56;

  separadorProducto = 0.01;
  separadorProductoAlto = 0.01;

  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer3D: THREE.WebGLRenderer;
  public objEstanteria;
  public controls: THREE.OrbitControls;

  constructor() {
    this.render = this.render.bind(this);
    this.cargarEstanteria = this.cargarEstanteria.bind(this);
    this.cargarProductos = this.cargarProductos.bind(this);
  }

  cargaDatosProductosGrupo(grupo, cambioBalda) {
    grupo.largo = grupo.largoReal / this.proporcion;
    grupo.ancho =  grupo.anchoReal / this.proporcion;
    grupo.alto =  grupo.altoReal / this.proporcion;
    this.inicioX = -(this.modulo.ancho / 2); // Izquierda restar, derecha sumar
    this.inicioY = (this.modulo.alto / 2) - (this.modulo.alto / this.modulo.numBaldas) + (this.datosBalda.altoBalda / 2);
    this.inicioZ = this.modulo.largo - (this.modulo.grosor / 2);
    this._finalX = this.inicioX;
    if (cambioBalda) {
      this._finalX = this.inicioX;
    }
    const inicioXGrupo = this._finalX + (grupo.ancho / 2);
    for (let i = 0; i < grupo.cantidad; i++) {
      grupo.productos.push({
        x: 0,
        y: 0,
        z: 0
      });
    }
    const maxProdsLargo = Math.trunc(this.datosBalda.largo / (grupo.largo + this.separadorProducto));
    const maxProdsAlto = Math.trunc( (this.datosBalda.alto - this.datosBalda.altoBalda) / (grupo.alto + this.separadorProductoAlto));
    let maxProdsFila;
    let totalFilas;
    let totalColumnas;
    const maxFilas = 1;
    if (grupo.horizontal) {
      totalFilas = maxProdsLargo;
      maxProdsFila = Math.trunc(grupo.productos.length / totalFilas);
      if ( (grupo.productos.length % totalFilas) > 0) {
        maxProdsFila += 1;
      }
      totalColumnas = 1;
    } else {
      totalFilas = 1;
      totalColumnas = Math.trunc(grupo.productos.length / maxProdsAlto);
      if ( (grupo.productos.length % maxProdsAlto) > 0) {
        totalColumnas += 1;
      }
      maxProdsFila = 1;
    }
    let contadorProductos = 0;
    let fila = 1;
    let columna = 1;
    let altura = 1;
    let contadorX = inicioXGrupo;
    let contadorY = 0;  // Para ir apilando los productos si es en vertical, y si no siempre sera inicioY
    let contadorZ = this.inicioZ - (grupo.largo / 2);
    console.log('cantidad=' + grupo.cantidad + ', maxProdsLargo=' + maxProdsLargo + ', maxProdsAlto='  +maxProdsAlto +
    ', maxProdsFila=' + maxProdsFila + ', totalColumnas=' + totalColumnas);
    console.log(grupo);
    grupo.productos.forEach( prod => {
      // NOTA: Las posiciones son respecto al centro del objeto
      // Los productos que se apilan en horizontal colocan todos los productos de una fila
      // y luego la de detras si hay
      // porque ya se han realizado los calculos de colocacion
      // Si se apila en vertical
      // TO DO: Falta ver como colocar los productos cuando exceda el apilamiento vertical
      prod.x = this.separadorProducto + contadorX;  // Izquierda es restar, derecha es sumar
      if (!grupo.horizontal) {
        this._finalX = prod.x + (grupo.ancho / 2);
      }
      if (grupo.balda === 1) {
        contadorY = this.inicioY;
        prod.y = contadorY + (grupo.alto / 2);
      } else {
        prod.y = contadorY + (this.modulo.alto / 2) - (this.datosBalda.alto * grupo.balda) + (this.datosBalda.altoBalda / 2)
        + (grupo.alto / 2); // Para bajar restar, para subir sumar
      }
      prod.z = contadorZ;  // Hacia atras restar, hacia delante sumar
      contadorProductos ++;
      if (!grupo.horizontal) {  // vertical
        if ((contadorProductos % maxProdsAlto) === 0 && !grupo.horizontal) {  // Columna completa
          // Otra columna o fila
          if (fila < maxProdsFila) {
            fila ++;
          } else if(columna < maxProdsLargo) {
            columna ++;
          }
          contadorX += grupo.ancho + this.separadorProducto;
          contadorY = 0;
          contadorZ -= prod.largo;
        } else {
          altura ++;
          contadorY += grupo.alto + this.separadorProductoAlto;
        }
      } else {   // horizontal
        if ((contadorProductos % maxProdsFila) === 0 && grupo.horizontal) { // Fila completa
          // Otra fila
          fila ++;
          this._finalX = prod.x + (grupo.ancho / 2);
          contadorX = inicioXGrupo;
          contadorZ -= grupo.largo;
        } else {
          contadorX += grupo.ancho + this.separadorProducto;
        }
      }
    });
    // if (!grupo.horizontal) {
    //   this._finalX = inicioXGrupo + grupo.ancho + this.separadorProducto;
    // } else {
    //   this._finalX = inicioXGrupo + ((this.separadorProducto + grupo.ancho) * maxProdsFila);
    // }
    this.datosBalda.baldas[grupo.balda - 1].posXProductos = this._finalX;
    console.log(grupo);
  }

  cargaDatosProductosGrupo2(grupo, cambioBalda) {
    grupo.largo = grupo.largoReal / this.proporcion;
    grupo.ancho =  grupo.anchoReal / this.proporcion;
    grupo.alto =  grupo.altoReal / this.proporcion;
    // Posicion inicial del objeto para empezar a pintarlo sin sumarle nada.
    this.inicioX = -(this.modulo.ancho / 2) + (grupo.ancho / 2); // Izquierda restar, derecha sumar.
    this.inicioY = (this.modulo.alto / 2) - (this.modulo.alto / this.modulo.numBaldas) + (this.datosBalda.altoBalda / 2) + (grupo.alto / 2);
    this.inicioZ = this.modulo.largo - (this.modulo.grosor / 2) - (grupo.largo / 2);
    if (this.datosBalda.baldas[grupo.balda - 1].posXProductos) {
      this._finalX = this.datosBalda.baldas[grupo.balda - 1].posXProductos + ( grupo.ancho / 2 );
    } else {
      this._finalX = this.inicioX;
    }
    for (let i = 0; i < grupo.cantidad; i++) {
      grupo.productos.push({
        x: 0,
        y: 0,
        z: 0
      });
    }
    const maxProdsLargo = Math.trunc(this.datosBalda.largo / (grupo.largo + this.separadorProducto));
    const maxProdsAlto = Math.trunc( (this.datosBalda.alto - this.datosBalda.altoBalda) / (grupo.alto + this.separadorProductoAlto));
    let maxProdsFila;
    let totalFilas;
    const maxFilas = 1;
    if (grupo.horizontal) {
      totalFilas = maxProdsLargo;
      maxProdsFila = Math.trunc(grupo.productos.length / totalFilas);
      if ( (grupo.productos.length % totalFilas) > 0) {
        maxProdsFila += 1;
      }
    }
    let contadorProductos = 0;
    let fila = 0;
    let columna = 0;
    let altura = 0;
    let lastX = this.inicioX;  // Posicion x mas alejada de un producto del grupo. Inicialmente debe ser la primera posicion x
    totalFilas = maxProdsLargo;
    console.log('cantidad=' + grupo.cantidad + ', maxProdsLargo=' + maxProdsLargo + ', maxProdsAlto='  +maxProdsAlto +
    ', maxProdsFila=' + maxProdsFila );
    console.log(grupo);
    grupo.productos.forEach( prod => {
      // NOTA: Las posiciones son respecto al centro del objeto
      prod.x = this._finalX + ( (this.separadorProducto + grupo.ancho) * (columna) );  // Izquierda es restar, derecha es sumar
      prod.y = this.inicioY - (this.datosBalda.alto * (grupo.balda - 1) ) + ((grupo.alto + this.separadorProductoAlto) * (altura) );
      prod.z = this.inicioZ - (grupo.largo * (fila) );
      contadorProductos ++;
      if (prod.x > lastX) {
        lastX = prod.x;
      }
      if (!grupo.horizontal) {  // vertical
        if ((contadorProductos % maxProdsAlto) === 0 && !grupo.horizontal) {  // Altura completa
          // Otra columna o fila
          if (fila < (totalFilas - 1) ) {
            fila ++;
          } else {
            columna ++;
            fila = 0;
          }
          altura = 0;
        } else {
          altura ++;
        }
      } else {   // horizontal
        if ((contadorProductos % maxProdsFila) === 0 && grupo.horizontal) { // Fila completa
          // Otra fila
          fila ++;
          columna = 0;
          altura = 0;
          lastX = prod.x;
        } else {
          columna++;
        }
      }
    });
    this.datosBalda.baldas[grupo.balda - 1].posXProductos = lastX + (grupo.ancho / 2);
    console.log(grupo);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event) {
      console.log('resizing..');
      this.camera.aspect = this.estanteriaRef.nativeElement.clientWidth / this.estanteriaRef.nativeElement.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer3D.setSize(this.estanteriaRef.nativeElement.clientWidth, this.estanteriaRef.nativeElement.clientHeight);
      this.render();
  }

  crearCamara(ancho: number, alto: number){
    this.camera = new THREE.PerspectiveCamera(50, ancho / alto, 0.2, 1000 );
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 70;
    const posScene = this.scene.position;
    posScene.y = posScene.y + 2;
    this.camera.lookAt( posScene);  // Mirar desde el centro de la escena
  }

  crearLuces() {
    // const ambientLight  = new THREE.AmbientLight( 0xffffff , 1);
    // this.scene.add( ambientLight );
    // const directionalLight = new THREE.DirectionalLight( 0xffffff, 3);
		// directionalLight.position.set( 0, 5, 1 ).normalize();
    // this.scene.add( directionalLight );
      const objectLoader = new THREE.ObjectLoader();
      const me = this;
      objectLoader.load('../../../assets/img/models/luces.json', function ( grupo ) {
        grupo.children.forEach(obj => {
          if (obj.type === 'DirectionalLight') {
            me.scene.add( obj );
          }
        });
      });
  }

  crearRenderizado3D(ancho: number, alto:number){
    this.renderer3D = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer3D.setPixelRatio(window.devicePixelRatio);
    this.renderer3D.setSize(ancho, alto);
    this.estanteriaRef.nativeElement.appendChild(this.renderer3D.domElement);  // Crea el elemento canvas
  }

  onProgress ( xhr ) {
    if ( xhr.lengthComputable ) {
      const percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete) + '% downloaded' );
    }
  }

  cargarEstanteria() {
    const objLoader = new THREE.GLTFLoader();
    const me = this;
    objLoader.load('../../../assets/img/models/estanteria/base.glb', function(gltf){
      let ob = gltf.scene.children[0];
      me.scene.add(ob);
      objLoader.load('../../../assets/img/models/estanteria/balda.glb', function(gltf2){
        const objectBalda = gltf2.scene.children[0];
        for (let i = 1; i <= (me.modulo.numBaldas - 1); i++) {
          ob = objectBalda.clone(true);
          ob.position.y = (me.modulo.alto / 2) - (me.datosBalda.alto * i);
          ob.position.z =  (me.datosBalda.largo / 2) + (me.modulo.grosor / 2);
          me.scene.add(ob);
        }
        objLoader.load('../../../assets/img/models/estanteria/balda-base.glb', function(gltf3){
          ob = gltf3.scene.children[0];
          ob.position.y = (me.modulo.alto / 2) - (me.datosBalda.alto * me.modulo.numBaldas);
          ob.position.z =  (me.datosBalda.largo / 2) + (me.modulo.grosor / 2);
          me.scene.add(ob);
        }, null, null);
        me.renderer3D.render(me.scene, me.camera);
      }, null, null);
       }, me.onProgress, null);
  }

  cargarProductos(posGrupo?: number) {
    const objLoader = new THREE.GLTFLoader();
    const grupos = this.grupoProductos;
    posGrupo = posGrupo || 0;
    const grupoProducto = this.grupoProductos[posGrupo];
    const me = this;
    objLoader.load(grupoProducto.modelo.path + grupoProducto.modelo.nombre, function(gltf){
        const object = gltf.scene.children[0];
        if (object.geometry) {
           object.geometry.center();
        }
        grupoProducto.productos.forEach(producto => {
          const ob = object.clone(true);
          ob.position.x = producto.x;
          ob.position.y = producto.y;
          ob.position.z = producto.z;
          me.scene.add(ob);
        });
        if (posGrupo < (grupos.length - 1)) {
          me.cargarProductos(posGrupo + 1);
        } else {
          me.renderer3D.render(me.scene, me.camera);
          // me.exportar(me.scene);
        }
       }, me.onProgress, null);
  }

  public render() {
    this.renderer3D.render(this.scene, this.camera);
  }

  public addControls() {
    this.controls = new THREE.OrbitControls(this.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.addEventListener('change', this.render);
  }

  ngOnInit() {
    // Completar datos:
    this.datosBalda.alto = (this.modulo.alto / this.modulo.numBaldas); // No es el alto util
    console.log(this.datosBalda.alto);
    for ( let aux = 0; aux < this.modulo.numBaldas; aux++) {
      this.datosBalda.baldas.push({
        num: aux + 1,
        posXProductos: 0
      });
    }
    let cambioBalda = false;
    for (let i = 0; i < this.grupoProductos.length; i++) {
      const grupo = this.grupoProductos[i];
      if (i > 0 && grupo.balda !== this.grupoProductos[i - 1].balda) {
        cambioBalda = true;
      } else {
        cambioBalda = false;
      }
      this.cargaDatosProductosGrupo2(grupo, cambioBalda);
    }
    // Obtener escena 3D:
    const ancho = this.estanteriaRef.nativeElement.clientWidth;
    const alto = this.estanteriaRef.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.crearLuces();
    this.crearCamara(ancho, alto + 1.72);
    this.crearRenderizado3D(ancho, alto);
    this.cargarEstanteria();
    this.addControls();
    this.cargarProductos();
  }

  exportar(scene){
    const exporter = new THREE.GLTFExporter();
    const me = this;
    exporter.parse(scene, function (gltf) {
      me._saveArrayBuffer( gltf, 'estanteria-rellena.glb' );
    }, { binary: true});
  }

  save(blob, filename) {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link); // Firefox workaround, see #6594
    link.href = URL.createObjectURL(blob);
    link.download = filename || 'data.json';
    link.click();
  }

  _saveArrayBuffer(buffer, filename) {
    this.save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
  }



}