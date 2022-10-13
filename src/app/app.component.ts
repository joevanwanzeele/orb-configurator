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
  title = 'orb path';
  generating = false;

  allLit = false;
  get totalLit(): number {
    return this.orb.totalLit();
  }
  get maxLit(): number {
    return this.orb.mostLit;
  }

  get bestPath0(): number[] {
    return this.orb.bestPath[0] ?? [];
  }
  get bestPath1(): number[] {
    return this.orb.bestPath[1] ?? [];
  }
  get bestPath2(): number[] {
    return this.orb.bestPath[2] ?? [];
  }
  get bestPath3(): number[] {
    return this.orb.bestPath[3] ?? [];
  }

  resetOrb() {
    console.log('initializing orb data');
    this.orb.initializeOrb();
    console.log('orb initialized');
    console.log('nodes: ', this.orb.nodes);
    console.log('segments: ', this.orb.segments);
  }

  findSolution() {
    this.orb.initializeOrb();
    this.attempts = 0;
    this.generating = true;
    while (!this.allLit && this.attempts < this.maxAttempts) {

      this.orb.getBestPaths(0);
      this.orb.allLit = this.orb.allLit;

      console.log('attempt: ', this.attempts);
      this.attempts++;
    }
    this.generating = false;
    console.log('attempt: ', this.attempts);
  }
}
