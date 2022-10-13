import { Component } from '@angular/core';
import * as _ from 'lodash';
import { Orb } from '../app/models/orb.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  orb = new Orb();
  startingNode = 0;
  randomStartNode = false;
  maxAttempts = 1000;
  attempts = 0;
  score = 0;
  title = 'orb path';
  generating = false;

  allLit = false;
  get totalLit(): number {
    return this.orb.totalLit();
  }
  get maxLit(): number {
    return this.orb.mostLit;
  }

  get bestPath(): number[][] {
    return this.orb.bestPath;
  }

  resetOrb() {
    console.log('initializing orb data');
    this.orb.initializeOrb();
    console.log('orb initialized');
    console.log('nodes: ', this.orb.nodes);
    console.log('segments: ', this.orb.segments);
  }

  findSolution() {
    console.log("are we generating yet?... ", this.generating)
    this.generating = true;

    this.orb.initializeOrb();
    this.attempts = 0;
    console.log("about to attempt ", this.maxAttempts, " iterations");

    console.log("are we generating now?... ", this.generating)

    var runit = new Promise(() => {
      while (!this.allLit && this.attempts < this.maxAttempts) {
        this.orb.getBestPaths(this.startingNode);
        this.orb.allLit = this.orb.allLit;
  
        console.log('attempt: ', this.attempts);
        this.attempts++;
      }
    });

    runit.then(() => {
      this.generating = false;
      console.log('attempt: ', this.attempts);
      console.log(this.orb.bestPath[1]);
    });
  }
}
