import { Component, OnInit } from '@angular/core';
//import { WorkerClient, WorkerManager } from 'angular-web-worker/angular';
import * as _ from 'lodash';
import { Orb } from '../app/models/orb.model';
//import { OrbWorker } from './orb.worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  orb = new Orb();
  startingNode1 = 1;
  startingNode2 = 9;
  startingNode3 = 4;
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

  ngOnInit(): void {
    this.orb.$running.subscribe(running => {
      this.generating = running;
      if (!running) {
        this.attempts = this.maxAttempts;
      }
    });

    this.orb.$newBestEvent.subscribe(this.setNewBest.bind(this));

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

  totalLedsInChannel(startNodeId: number){
    var total = 0;
    this.bestPaths.get(startNodeId).forEach((channel, idx) => {      
      total += this.totalLedsInChannelPath(startNodeId, idx);
    })
    return total;
  }

  totalLedsInChannelPath(startNodeId: number, channelId: number): number {
    var segmentIds = this.bestPaths.get(startNodeId)[channelId];
    var segments = segmentIds.map(sId => this.orb.segments[sId]);
    return _.sumBy(segments, "leds");
  }

  async findSolution() {
    if (this.generating) { console.warn("please wait until current attempts are complete."); return }
    this.generating = true;
    //console.log("about to call web worker");
    // const _worker = new Worker(new URL('./bruteforce.worker', import.meta.url));
    // _worker.onmessage = ({ data }) => { console.log(data); this.generating = false; };
    //_worker.addListener("message", ({data}) => console.log(data));
    //console.log(_worker);
    //_worker.postMessage({ maxAttempts: this.maxAttempts, startingNodeIds: [this.startingNode1, this.startingNode2, this.startingNode3, this.startingNode4]});    
    //console.log("called webworker");
    //_worker.postMessage({ orb: this.orb, maxAttempts: this.maxAttempts, startingNodeIds: [this.startingNode1, this.startingNode2, this.startingNode3, this.startingNode4] });
   

    //await this.client.call(w => w.runCheckPaths(this.orb, this.maxAttempts, [this.startingNode1, this.startingNode2, this.startingNode3, this.startingNode4]));

    //postMessage({ orb: this.orb, maxAttempts: this.maxAttempts, startingNodeIds: [this.startingNode1, this.startingNode2, this.startingNode3, this.startingNode4] });

    setTimeout(() =>
      this.orb.findSolution([this.startingNode1, this.startingNode2, this.startingNode3, this.startingNode4], this.maxAttempts), 100);
  }
}

