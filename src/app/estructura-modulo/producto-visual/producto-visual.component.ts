import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import * as THREE from 'three-full';

@Component({
  selector: 'app-producto-visual',
  templateUrl: './producto-visual.component.html',
  styleUrls: ['./producto-visual.component.scss']
})
export class ProductoVisualComponent implements OnInit, AfterViewInit {

  @ViewChild('contProd') contenedor: ElementRef;
  @Input() data: any;  // Por de pronto se usa solo de lectura

  // Medidas de pantalla
  @Input() alto = 0;
  @Input() ancho = 0;
  @Input() largo = 0;
  @Input() imgTop = '';
  @Input() imgFront = '';
  @Input() imgLeft = '';
  @Input() imgRight = '';

  constructor(public renderer: Renderer2) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
 
  }

}
