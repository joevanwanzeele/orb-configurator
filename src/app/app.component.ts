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
  title = 'brute force orb path finder.';
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
    this.generating = true;

    this.orb.initializeOrb();
    this.attempts = 0;

    var runit = new Promise((done) => {
      while (!this.allLit && this.attempts < this.maxAttempts) {
        this.orb.getBestPaths(this.startingNode);
        this.orb.allLit = this.orb.allLit;
        this.attempts++;
      }
      done(this.orb.bestPath);
    });

    runit.then((bestPath) => {
      this.generating = false;
      console.log(bestPath);
    });
  }
}
