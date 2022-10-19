import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Orb } from '../app/models/orb.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  orb = new Orb();
  startingNode1 = 2;
  startingNode2 = 24;
  randomStartNode = false;
  maxAttempts = 5000;
  attempts = 0;
  totalUntilBest = 0;
  score = 0;
  title = 'brute force orb path finder.';
  generating: boolean;
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

  constructor(private cdr: ChangeDetectorRef){
    this.orb.$running.subscribe(running => {
      console.log("running event fired!", running)
      this.generating = running;
      cdr.detectChanges();
    });

    this.orb.$newBestEvent.subscribe(newBestPath => {
      this.bestPaths = newBestPath;  
      this.allLit = this.orb.allLit();
      this.unlitSegments = this.orb.fewestUnlit;
      var unlitOrbSegments = this.unlitSegments.map(sId => this.orb.segments[sId]);
      this.totalUnlitLeds = _.sumBy(unlitOrbSegments, "leds");
      this.attempts = this.maxAttempts;   
      this.totalUntilBest = this.orb.attemptTally;
      console.log("new best path event!");
    });
  }

  ngOnInit(): void {

  }

  resetOrb() {
    console.log('resetting orb data');
    this.allLit = false;
    this.score = 0;
    this.totalUnlitLeds = -1;
    this.totalUntilBest = 0;
    this.unlitSegments = [];
    this.bestPaths = new Map<number, number[][]>();

    this.orb.resetOrb();
    console.log('orb initialized');
    console.log('nodes: ', this.orb.nodes);
    console.log('segments: ', this.orb.segments);
  }

  totalLedsInChannelPath(startNodeId: number, channelId: number):number{
    var segmentIds = this.bestPaths.get(startNodeId)[channelId];
    var segments = segmentIds.map(sId => this.orb.segments[sId]);
    return _.sumBy(segments, "leds");
  }

  findSolution() {
    this.generating = true;

    setTimeout(() =>
      this.orb.findSolution([this.startingNode1, this.startingNode2], this.maxAttempts), 2);
  }
}
