import { Component } from '@angular/core';
import * as _ from 'lodash';
import { Orb, OrbSegment } from '../app/models/orb.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  orb = new Orb();
  startingNode1 = 0;
  startingNode2 = 41;
  randomStartNode = false;
  maxAttempts = 1000;
  attempts = 0;
  score = 0;
  title = 'brute force orb path finder.';
  generating = false;
  allLit = false;
  totalUnlitLeds = -1;

  unlitSegments: number[] = [];
  bestPaths = new Map<number, number[][]>();
  get totalLit(): number {
    return this.orb.totalLit();
  }
  get maxLit(): number {
    return this.orb.mostLit;
  }

  resetOrb() {
    console.log('resetting orb data');
    this.allLit = false;
    this.score = 0;
    this.totalUnlitLeds = -1;
    this.unlitSegments = [];
    this.bestPaths = new Map<number, number[][]>();

    this.orb.initializeOrb();
    console.log('orb initialized');
    console.log('nodes: ', this.orb.nodes);
    console.log('segments: ', this.orb.segments);
  }

  totalLedsInChannelPath(startNodeId: number, channelId: number):number{
    var segmentIds = this.bestPaths.get(startNodeId)[channelId];
    var segments = segmentIds.map(sId => this.orb.segments[sId]);
    return _.sumBy(segments, "leds");
    //var total = this.orb.segments[segIdx].ledsInPath;
    //return total;
  }

  findSolution() {
    this.generating = true;

    this.orb.initializeOrb();
    this.attempts = 0;

    var runit = new Promise((done) => {
      while (!this.allLit && this.attempts < this.maxAttempts) {
        this.orb.getBestPaths([this.startingNode1, this.startingNode2]);
        this.attempts++;
      }
      done(this.orb.bestPaths);
    });

    runit.then((bestPaths: Map<number, number[][]>) => {
      this.allLit = this.orb.allLit();
      this.unlitSegments = this.orb.fewestUnlit;
      var unlitOrbSegments = this.unlitSegments.map(sId => this.orb.segments[sId]);
      this.totalUnlitLeds = _.sumBy(unlitOrbSegments, "leds");
      this.generating = false;
      this.bestPaths = bestPaths;      
      console.log(this.bestPaths);
    });
  }
}
