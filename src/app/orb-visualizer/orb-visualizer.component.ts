import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Orb, OrbNode, OrbSegment } from '../models/orb.model';
import * as THREE from "three";

@Component({
  selector: 'app-orb-visualizer',
  templateUrl: './orb-visualizer.component.html',
  styleUrls: ['./orb-visualizer.component.css']
})
export class OrbVisualizerComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  private canvasRef: ElementRef;

  @Input() public segments: OrbSegment[];
  @Input() public nodes: OrbNode[];

  levelHeight: number = 50;
  levelVarianceHeight: number = 3;

  private ctx: CanvasRenderingContext2D;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

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
