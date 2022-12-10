import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Orb } from '../app/models/orb.model';
import { spawn, Thread, Worker } from "threads"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  orb = new Orb();
  startingNode1 = 2;
  startingNode2 = 4;
  startingNode3 = 10;
  startingNode4 = 14;
  randomStartNode = false;
  maxAttempts = 5000;
  attempts = 0;
  totalUntilBest = 0;
  score = 0;
  title = 'brute force orb path finder.';
  generating: boolean;
  allLit = false;
  totalUnlitLeds = -1;
  webWorker;

  unlitSegments: number[] = [];
  bestPaths = new Map<number, number[][]>();
  get totalLit(): number {
    return this.orb.totalLit();
  }
  get maxLit(): number {
    return this.orb.mostLit;
  }


  setNewBest(newBestPath) {
    console.log("setting new best ", newBestPath);
    this.bestPaths = newBestPath;
    this.allLit = this.orb.allLit();
    this.unlitSegments = this.orb.fewestUnlit;
    var unlitOrbSegments = this.unlitSegments.map(sId => this.orb.segments[sId]);
    this.totalUnlitLeds = _.sumBy(unlitOrbSegments, "leds");
    this.attempts += this.maxAttempts;
    //console.log("so... attempts should equal maxattempts now, which equals ", this.maxAttempts)
    this.totalUntilBest = this.orb.attemptTally;
  }

  async ngOnInit(): Promise<void> {
    // this.orb.$running.subscribe(running => {
    //   this.generating = running;
    //   if (!running){
    //     this.attempts = this.maxAttempts;
    //   }
    // });

    // this.orb.$newBestEvent.subscribe(this.setNewBest.bind(this));

    if (typeof Worker !== 'undefined') {
      //this.webWorker = await spawn(new Worker("./orb.worker"));
      this.webWorker = new Worker('./orb.worker', { type: 'module' });
      this.webWorker.onmessage = function (data) {
        if (data.done) {
          this.generating = false;
        }
        else this.setNewBest.bind(this)(data);
      }
    }
    else {
      console.warn("Web workers are not supported.");
    }
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

  totalLedsInChannelPath(startNodeId: number, channelId: number): number {
    var segmentIds = this.bestPaths.get(startNodeId)[channelId];
    var segments = segmentIds.map(sId => this.orb.segments[sId]);
    return _.sumBy(segments, "leds");
  }

  async findSolution() {
    if (this.generating) { alert("please wait until current attempts are complete."); return }
    this.generating = true;
    postMessage({ orb: this.orb, maxAttempts: this.maxAttempts, startingNodeIds: [this.startingNode1, this.startingNode2, this.startingNode3, this.startingNode4] });

    // setTimeout(() =>
    //   this.orb.findSolution([this.startingNode1, this.startingNode2, this.startingNode3, this.startingNode4], this.maxAttempts), 100);
  }
}

