import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Orb, OrbNode, OrbSegment } from '../models/orb.model';
import * as THREE from "three";

const MIRROR_PARTS = ["Mirror_-_"];
const FRAME_PARTS = ["Dome_-_CPF", "Dome_-_CPC", "Dome_-_CPD", "Dome_-_CPE"];
const PLASTIC_PARTS = ["Bezel", "Way", "CLAMP", "Clamp"];

@Component({
  selector: 'app-orb-visualizer',
  templateUrl: './orb-visualizer.component.html',
  styleUrls: ['./orb-visualizer.component.css']
})
export class OrbVisualizerComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  private canvasRef: ElementRef;
  
  private get canvas() {
    return this.canvasRef.nativeElement;
  }

  @Input() public segments: OrbSegment[];
  @Input() public nodes: OrbNode[];

  levelHeight: number = 50;
  levelVarianceHeight: number = 3;

  //private ctx: THREE.WebGL1Renderer.CanvasRenderingContext2D;



  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
  }

  private createScene(){}

  private startRenderingLoop(){}

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  drawOrb(orb: Orb) {


  }

  animate(): void { }

  getNodeXY(nodeIndex: number) {
    // x is position in row
    // y is y of level (of 7)
    return;
  }

  getNodeLevel(nodeIndex: number): number {
    switch (true) {
      case nodeIndex == 0: return 0;
      case nodeIndex < 6: return 1;
      case nodeIndex < 16: return 2;
      case nodeIndex < 26: return 3;
      case nodeIndex < 36: return 4;
      case nodeIndex < 41: return 5;
      default: return 6;
    }
  }

  getNodeY(nodeIndex: number): number {
    var level = this.getNodeLevel(nodeIndex);
    var y = level * this.levelHeight;
    if (level == 2 || level == 4) {
      if (nodeIndex % 2 == 0) { //the even numbered ones are lower on these rows.
        return y - this.levelVarianceHeight;
      }
      return y + this.levelVarianceHeight;
    }
    return y;
  }

  getNodeX(nodeIndex: number): number {
    var level = this.getNodeLevel(nodeIndex);

    // switch(true){
    //   case nodeIndex == 0 || nodeIndex == 6:
    //     return this.canvasWidth / 2;
    //   case nodeIndex == 1 || nodeIndex == 5:
    //     var spacing = this.canvasWidth / 8;
    //     return spacing * 2 + (level == 5 ? nodeIndex - 35 : nodeIndex) * spacing;
    //   default:
    //     var spacing = this.canvasWidth / 11;
    //     if (nodeIndex )
    //     return 
    return 0;
  }

}
