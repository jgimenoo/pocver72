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
  private pathFicheros3d = '../../../assets/img/models/';

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
    // Posicion inicial del objeto para empezar a pintarlo sin sumarle nada.
    this.inicioX = -(this.modulo.ancho / 2) + (grupo.ancho / 2); // Izquierda restar, derecha sumar.
    this.inicioY = (this.modulo.alto / 2) - (this.datosBalda.separacion) + (this.datosBalda.alto / 2) + (grupo.alto / 2);
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
    const maxProdsAlto = Math.trunc( (this.datosBalda.separacion - this.datosBalda.alto) / (grupo.alto + this.separadorProductoAlto));
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
    // console.log('cantidad=' + grupo.cantidad + ', maxProdsLargo=' + maxProdsLargo + ', maxProdsAlto='  +maxProdsAlto + ', maxProdsFila=' + maxProdsFila );
    // console.log(grupo);
    grupo.productos.forEach( prod => {
      // NOTA: Las posiciones son respecto al centro del objeto
      prod.x = this._finalX + ( (this.separadorProducto + grupo.ancho) * (columna) );  // Izquierda es restar, derecha es sumar
      prod.y = this.inicioY - (this.datosBalda.separacion * (grupo.balda - 1) ) + ((grupo.alto + this.separadorProductoAlto) * (altura) );
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
    // console.log(grupo);
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
    let estanteriaBase;
    let baldaBase;
    let largoBase;
    if (! this.modulo.refrigerado) {
      estanteriaBase = '../../../assets/img/models/estanteria/base.glb';
      baldaBase = '../../../assets/img/models/estanteria/balda-base.glb';
      largoBase = this.datosBalda.largo;
    } else {
      estanteriaBase = '../../../assets/img/models/estanteria/refrigerado.glb';
      baldaBase = '../../../assets/img/models/estanteria/balda-base-r.glb';
      largoBase = this.datosBalda.largoBase;
    }
    objLoader.load(estanteriaBase, function(gltf){
      let ob = gltf.scene.children[0];
      me.scene.add(ob);
      objLoader.load('../../../assets/img/models/estanteria/balda.glb', function(gltf2){
        const objectBalda = gltf2.scene.children[0];
          for (let i = 1; i <= (me.modulo.numBaldas - 1); i++) {
            ob = objectBalda.clone(true);
            ob.position.y = (me.modulo.alto / 2) - (me.datosBalda.separacion * i);
            ob.position.z =  (me.datosBalda.largo / 2) + (me.modulo.grosor / 2);
            me.scene.add(ob);
          }
          objLoader.load(baldaBase, function(gltf3){
            ob = gltf3.scene.children[0];
            ob.position.y = (me.modulo.alto / 2) - (me.datosBalda.separacion * me.modulo.numBaldas);
            ob.position.z =  (largoBase / 2) + (me.modulo.grosor / 2);
            me.scene.add(ob);
            me.renderer3D.render(me.scene, me.camera);
            // me.exportar(me.scene);
          }, null, null);
      }, null, null);
       }, me.onProgress, null);
  }

  cargarProductos(posGrupo?: number) {
    const objLoader = new THREE.GLTFLoader();
    const grupos = this.grupoProductos;
    posGrupo = posGrupo || 0;
    const grupoProducto = this.grupoProductos[posGrupo];
    const me = this;
    if (grupoProducto) {
      objLoader.load(me.pathFicheros3d + grupoProducto.fichero3d, function(gltf){
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
        }
       }, me.onProgress, null);
    }
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
    let cambioBalda = false;
    for (let i = 0; i < this.grupoProductos.length; i++) {
      const grupo = this.grupoProductos[i];
      if (i > 0 && grupo.balda !== this.grupoProductos[i - 1].balda) {
        cambioBalda = true;
      } else {
        cambioBalda = false;
      }
      this.cargaDatosProductosGrupo(grupo, cambioBalda);
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
