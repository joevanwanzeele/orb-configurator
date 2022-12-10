import * as _ from 'lodash';
import { Subject } from 'rxjs';

export type HubType = 5 | 6;
export const TOTAL_NODES = 42;
export const TOTAL_SEGMENTS = 120;

export class Orb {
  nodes: OrbNode[] = [];
  segments: OrbSegment[] = [];
  mostLit: number = 0;
  bestPath: number[][] = [];
  bestPaths = new Map<number, number[][]>();
  fewestUnlit: number[] = [];
  startingNodes: number[] = [];
  attemptsUntilBest = 0;
  attemptTally = 0;
  $newBestEvent = new Subject<any>();
  $running = new Subject<boolean>();

  constructor() {
    this.findSolution.bind(this);
    this.runit.bind(this);
  }

  resetOrb() {
    this.bestPath = [];
    this.bestPaths = new Map<number, number[][]>();
    this.fewestUnlit = [];
    this.startingNodes = [];
    this.attemptTally = 0;
    this.mostLit = 0;
    this.attemptsUntilBest = 0;
    this.initializeOrb();
  }

  initializeOrb() {
    this.nodes = [];
    this.segments = [];

    for (var i = 0; i < TOTAL_SEGMENTS; i++) {
      this.segments.push(new OrbSegment(i));
    }

    for (var i = 0; i < TOTAL_NODES; i++) {
      this.nodes.push(new OrbNode(i));
    }

    var longSegs = [5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 37, 38, 41, 42, 45, 46, 49, 50, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 69, 70, 73, 74, 77, 78, 81, 82, 95, 96, 98, 99, 101, 102, 104, 105, 107, 108, 110, 111, 112, 113, 115]
    longSegs.forEach(sId => this.segments[sId].leds = 51);

    var node0 = this.nodes[0];
    node0.hubType = 5;
    node0.setNeighbors(this.nodes, 1, 2, 3, 4, 5);
    node0.setSegments(this.segments, 0, 1, 2, 3, 4);

    var node1 = this.nodes[1];
    node1.hubType = 6;
    node1.setNeighbors(this.nodes, 0, 2, 5, 6, 7, 15);
    node1.setSegments(this.segments, 0, 5, 9, 10, 11, 12);

    var node2 = this.nodes[2];
    node2.hubType = 6;
    node2.setNeighbors(this.nodes, 0, 1, 3, 7, 8, 9);
    node2.setSegments(this.segments, 1, 5, 6, 13, 14, 15);

    var node3 = this.nodes[3];
    node3.hubType = 6;
    node3.setNeighbors(this.nodes, 0, 2, 4, 9, 10, 11);
    node3.setSegments(this.segments, 2, 6, 7, 16, 17, 18);

    var node4 = this.nodes[4];
    node4.hubType = 6;
    node4.setNeighbors(this.nodes, 0, 3, 5, 11, 12, 13);
    node4.setSegments(this.segments, 3, 7, 8, 19, 20, 21);

    var node5 = this.nodes[5];
    node5.hubType = 6;
    node5.setNeighbors(this.nodes, 0, 4, 1, 13, 14, 15);
    node5.setSegments(this.segments, 4, 8, 9, 22, 23, 24);

    var node6 = this.nodes[6];
    node6.hubType = 5;
    node6.setNeighbors(this.nodes, 1, 15, 7, 16, 25);
    node6.setSegments(this.segments, 11, 34, 25, 35, 36);

    var node7 = this.nodes[7];
    node7.hubType = 6;
    node7.setNeighbors(this.nodes, 1, 2, 6, 8, 16, 17);
    node7.setSegments(this.segments, 12, 13, 25, 26, 37, 38);

    var node8 = this.nodes[8];
    node8.hubType = 5;
    node8.setNeighbors(this.nodes, 2, 7, 9, 17, 18);
    node8.setSegments(this.segments, 14, 26, 27, 39, 40);

    var node9 = this.nodes[9];
    node9.hubType = 6;
    node9.setNeighbors(this.nodes, 1, 2, 6, 8, 16, 17);
    node9.setSegments(this.segments, 15, 16, 27, 28, 41, 42);

    var node10 = this.nodes[10];
    node10.hubType = 5;
    node10.setNeighbors(this.nodes, 3, 9, 11, 19, 20);
    node10.setSegments(this.segments, 17, 28, 29, 43, 44);

    var node11 = this.nodes[11];
    node11.hubType = 6;
    node11.setNeighbors(this.nodes, 3, 4, 10, 12, 20, 21);
    node11.setSegments(this.segments, 18, 19, 29, 30, 45, 46);

    var node12 = this.nodes[12];
    node12.hubType = 5;
    node12.setNeighbors(this.nodes, 4, 11, 13, 21, 22);
    node12.setSegments(this.segments, 20, 30, 31, 47, 48);

    var node13 = this.nodes[13];
    node13.hubType = 6;
    node13.setNeighbors(this.nodes, 4, 5, 12, 14, 22, 23);
    node13.setSegments(this.segments, 21, 22, 31, 32, 49, 50);

    var node14 = this.nodes[14];
    node14.hubType = 5;
    node14.setNeighbors(this.nodes, 5, 13, 15, 23, 24);
    node14.setSegments(this.segments, 23, 32, 33, 51, 52);

    var node15 = this.nodes[15];
    node15.hubType = 6;
    node15.setNeighbors(this.nodes, 1, 5, 14, 6, 24, 25);
    node15.setSegments(this.segments, 10, 24, 33, 34, 53, 54);

    var node16 = this.nodes[16];
    node16.hubType = 6;
    node16.setNeighbors(this.nodes, 6, 7, 17, 25, 26, 27);
    node16.setSegments(this.segments, 36, 37, 55, 64, 66, 67);

    var node17 = this.nodes[17];
    node17.hubType = 6;
    node17.setNeighbors(this.nodes, 7, 8, 16, 18, 28, 29);
    node17.setSegments(this.segments, 38, 39, 55, 56, 68, 69);

    var node18 = this.nodes[18];
    node18.hubType = 6;
    node18.setNeighbors(this.nodes, 8, 9, 17, 19, 28, 29);
    node18.setSegments(this.segments, 40, 41, 56, 57, 70, 71);

    var node19 = this.nodes[19];
    node19.hubType = 6;
    node19.setNeighbors(this.nodes, 9, 10, 18, 20, 29, 30);
    node19.setSegments(this.segments, 42, 43, 57, 58, 72, 73);

    var node20 = this.nodes[20];
    node20.hubType = 6;
    node20.setNeighbors(this.nodes, 10, 11, 19, 21, 30, 31);
    node20.setSegments(this.segments, 44, 45, 58, 59, 74, 75);

    var node21 = this.nodes[21];
    node21.hubType = 6;
    node21.setNeighbors(this.nodes, 11, 12, 20, 22, 31, 32);
    node21.setSegments(this.segments, 46, 47, 59, 60, 76, 77);

    var node22 = this.nodes[22];
    node22.hubType = 6;
    node22.setNeighbors(this.nodes, 12, 13, 21, 23, 32, 33);
    node22.setSegments(this.segments, 48, 49, 60, 61, 78, 79);

    var node23 = this.nodes[23];
    node23.hubType = 6;
    node23.setNeighbors(this.nodes, 13, 14, 22, 24, 33, 34);
    node23.setSegments(this.segments, 50, 51, 61, 62, 80, 81);

    var node24 = this.nodes[24];
    node24.hubType = 6;
    node24.setNeighbors(this.nodes, 14, 15, 23, 25, 34, 35);
    node24.setSegments(this.segments, 52, 53, 62, 63, 82, 83);

    var node25 = this.nodes[25];
    node25.hubType = 6;
    node25.setNeighbors(this.nodes, 15, 6, 24, 16, 35, 26);
    node25.setSegments(this.segments, 54, 35, 63, 64, 65, 84);

    // bottom half

    var node26 = this.nodes[26];
    node26.hubType = 5;
    node26.setNeighbors(this.nodes, 16, 25, 35, 27, 36);
    node26.setSegments(this.segments, 65, 66, 85, 94, 96);

    var node27 = this.nodes[27];
    node27.hubType = 6;
    node27.setNeighbors(this.nodes, 16, 17, 26, 28, 36, 37);
    node27.setSegments(this.segments, 67, 68, 85, 86, 97, 98);

    var node28 = this.nodes[28];
    node28.hubType = 5;
    node28.setNeighbors(this.nodes, 17, 18, 27, 29, 37);
    node28.setSegments(this.segments, 69, 70, 86, 87, 99);

    var node29 = this.nodes[29];
    node29.hubType = 6;
    node29.setNeighbors(this.nodes, 18, 19, 28, 30, 37, 38);
    node29.setSegments(this.segments, 71, 72, 87, 88, 100, 101);

    var node30 = this.nodes[30];
    node30.hubType = 5;
    node30.setNeighbors(this.nodes, 19, 20, 29, 31, 38);
    node30.setSegments(this.segments, 73, 74, 88, 89, 102);

    var node31 = this.nodes[31];
    node31.hubType = 6;
    node31.setNeighbors(this.nodes, 20, 21, 30, 32, 38, 39);
    node31.setSegments(this.segments, 75, 76, 89, 90, 103, 104);

    var node32 = this.nodes[32];
    node32.hubType = 5;
    node32.setNeighbors(this.nodes, 21, 22, 31, 33, 39);
    node32.setSegments(this.segments, 77, 78, 90, 91, 105);

    var node33 = this.nodes[33];
    node33.hubType = 6;
    node33.setNeighbors(this.nodes, 22, 23, 32, 34, 39, 40);
    node33.setSegments(this.segments, 79, 80, 91, 92, 106, 107);

    var node34 = this.nodes[34];
    node34.hubType = 5;
    node34.setNeighbors(this.nodes, 23, 24, 33, 35, 40);
    node34.setSegments(this.segments, 81, 82, 92, 93, 108);

    var node35 = this.nodes[35];
    node35.hubType = 6;
    node35.setNeighbors(this.nodes, 24, 25, 34, 26, 40, 36);
    node35.setSegments(this.segments, 83, 84, 93, 94, 109, 95);

    var node36 = this.nodes[36];
    node36.hubType = 6;
    node36.setNeighbors(this.nodes, 35, 26, 27, 40, 37, 41);
    node36.setSegments(this.segments, 95, 96, 97, 110, 114, 115);

    var node37 = this.nodes[37];
    node37.hubType = 6;
    node37.setNeighbors(this.nodes, 27, 28, 29, 36, 38, 41);
    node37.setSegments(this.segments, 98, 99, 100, 110, 111, 116);

    var node38 = this.nodes[38];
    node38.hubType = 6;
    node38.setNeighbors(this.nodes, 29, 30, 31, 37, 39, 41);
    node38.setSegments(this.segments, 101, 102, 103, 111, 112, 117);

    var node39 = this.nodes[39];
    node39.hubType = 6;
    node39.setNeighbors(this.nodes, 31, 32, 33, 38, 40, 41);
    node39.setSegments(this.segments, 104, 105, 106, 112, 113, 118);

    var node40 = this.nodes[40];
    node40.hubType = 6;
    node40.setNeighbors(this.nodes, 33, 34, 35, 39, 36, 41);
    node40.setSegments(this.segments, 107, 108, 109, 113, 114, 119);

    var node41 = this.nodes[41];
    node41.hubType = 5;
    node41.setNeighbors(this.nodes, 36, 37, 38, 39, 40);
    node41.setSegments(this.segments, 115, 116, 117, 118, 119);

    this.nodes.forEach(node => {
      var n = Number.parseInt(node.hubType.toString());
      var ok = node.segments.length == node.neighbors.length && node.neighbors.length == n
      if (!ok) throw `Setup Error!  check values for node ${node.id}`;
    })
  }

  async runit(maxAttempts: number, startingNodeIds: number[]) {
    this.initializeOrb();
    //console.log('running it.. maxAttempts = ', maxAttempts);
    //console.log('are they all lit??  ', this.allLit())
    var attempts = 0;
    while (!this.allLit() && attempts < maxAttempts) {
      //console.log('in the loop..');
      await this.getBestPaths(startingNodeIds);
      attempts++;
      this.attemptTally++;
      this.initializeOrb();
    }
  }

  async findSolution(startingNodeIds: number[], maxAttempts: number) {
    this.$running.next(true);

    //console.log('getting ready to wait.. ');
    await this.runit(maxAttempts, startingNodeIds);
    //console.log('done waiting')

    this.$running.next(false);
  }

  async getBestPaths(startingNodeIds: number[]) {
    this.startingNodes = startingNodeIds;
    //init orb
    //console.log('clearing previous paths...');
    //console.log('next attempt, starting at hubs/nodes ', startingNodeIds);

    //init channels

    startingNodeIds.forEach(nId => {
      var base = this.nodes[nId];
      base.isBase = true;
      if (base.segments.filter(s => !s.lit).length < 4){
        console.warn("unable to utilize all of the channels for conroller "+ nId);        
      }
      var startSegments = _.sampleSize(base.segments.filter(s => !s.lit), 4); //randomly select 4 unlit segments
      
      startSegments.forEach((s) => {
        s.lit = true;
        s.pathPosition = 0;
        s.baseNodeId = nId;
      });
    });

    //first extension
    var result = this.getNextSegmentId();
    var previousSegmentId = result[0];
    var nextSegmentId = result[1];

    // console.log('starting segment: ', previousSegmentId);
    // console.log('next segment: ', nextSegmentId);


    while (!this.allLit() && nextSegmentId != -1) {
      this.segments[nextSegmentId].inSegment = this.segments[previousSegmentId];
      this.segments[previousSegmentId].outSegment =
        this.segments[nextSegmentId];
      var next = this.getNextSegmentId();
      previousSegmentId = next[0];
      nextSegmentId = next[1];
    }

    var total = this.totalLit();
    //console.log("comparing solutions.. ");
    //console.log("previous best: ", this.mostLit);
    //console.log("current result: ", total);
    if (total >= this.mostLit) {
      //new best path
      var newContender = this.getPaths();
      var newerIsBetter = true;

      if (total == this.mostLit) {
        //they're equal
        //let's also score them based on their relative length similarity
        let maxCurrentLength = 0;
        let minCurrentLength = 0;

        maxCurrentLength = _.reduce(this.bestPath, function (max, n) {
          return Math.max(max, n.length);
        }, maxCurrentLength);

        maxCurrentLength = _.reduce(this.bestPath, function (min, n) {
          return Math.min(min, n.length);
        }, minCurrentLength);

        var currentDisparity = maxCurrentLength - minCurrentLength;

        //get latest metrics
        let maxContenderLength = 0;
        let minContenderLength = 0;

        maxContenderLength = _.reduce(newContender, function (max, n) {
          return Math.max(max, n.length);
        }, maxContenderLength);

        minContenderLength = _.reduce(newContender, function (min, n) {
          return Math.min(min, n.length);
        }, minContenderLength);

        var latestDisparity = maxContenderLength - minContenderLength;

        if (currentDisparity - latestDisparity < 0) newerIsBetter = false; //the latest has more length disparity (and is less desirable).
      }

      if (newerIsBetter) {

        this.mostLit = total;
        this.bestPath = newContender;

        startingNodeIds.forEach(nId => {
          this.bestPaths.set(nId, this.getPaths(nId));
        });

        this.fewestUnlit = this.unLit().map(u => u.id);

        this.$newBestEvent.next(this.bestPaths)
        this.attemptsUntilBest = this.attemptTally;
        console.log('set new best path: ', this.bestPath);
      }
    }
  }

  getPaths(startingNodeIdx: number = -1): number[][] {
    var fullPath: number[][] = [];
    var startingSegments: OrbSegment[] = [];

    if (startingNodeIdx == -1) {
      startingSegments = this.segments.filter((s) => s.lit && !s.inSegment && s.pathPosition == 0);
    } else {
      var startingNode = this.nodes[startingNodeIdx];
      startingSegments = startingNode.segments.filter((s) => s.lit && !s.inSegment && s.pathPosition == 0 && s.baseNodeId == startingNodeIdx);
    }

    var startingNodes = startingNodeIdx == -1 ? this.nodes.filter(n => n.isBase) : [this.nodes[startingNodeIdx]];

    if (startingSegments.length != startingNodes.length * 4)
      throw new Error('uneven number of starting segments');

    startingSegments.forEach(s => {
      fullPath.push(this.getPath(s, [s.id]));
    });

    return fullPath;
  }

  getPath(s: OrbSegment, path: number[]): number[] {
    if (!s.outSegment) return path;
    path.push(s.outSegment.id);
    return this.getPath(s.outSegment, path);
  }

  getNextSegmentId(): number[] {
    let segToExtend!: OrbSegment;
    var returnSegmentId = -1;
    // find shortest path
    // select a segment randomly from available options

    //first, get lit segments with no outsegment
    var pathEnds = this.segments.filter(
      (s) => s.lit && s.outSegment == null
    );
    if (pathEnds.length == 0) return [-1, -1];

    //of those, select one with the shortest path to the base
    pathEnds = _.orderBy(pathEnds, 'pathPosition');
    //console.log("path ends: ", pathEnds);

    let attemptedIdx = -1;

    while (returnSegmentId == -1 && attemptedIdx < --pathEnds.length) {
      attemptedIdx++;
      segToExtend = pathEnds[attemptedIdx] as OrbSegment;
      var nodeOptions = segToExtend.nodes.filter(
        (n) => !n.isBase && segToExtend.inSegment == null
      ); // for the first segment, we just need to select the node that isn't the base
      var nextNode: OrbNode;
      if (nodeOptions.length == 1) nextNode = nodeOptions[0];
      else {
        var currentNodes = segToExtend?.nodes ?? [];
        var previousNodes = segToExtend?.inSegment?.nodes ?? [];
        nextNode = _.difference(currentNodes, previousNodes)[0] as OrbNode; //if not the first segment, select the node that wasn't already traversed.
      }

      if (nextNode != null) {
        var options = nextNode.segments.filter((s) => !s.lit);
        //select next segment from available non-lit segments at the outnode
        //if none available, try pathEnds[+1]
        if (options.length > 0) returnSegmentId = _.sample(options)?.id ?? -1;
      } else returnSegmentId = -1;
    }
    var fromId = segToExtend?.id ?? -1;
    var toId = returnSegmentId;
    return [fromId, toId];
  }

  allLit() {
    return this.segments.every((s) => s.lit);
  }

  totalLit() {
    return this.segments.filter((s) => s.lit).length;
  }

  unLit() {
    return this.segments.filter((s) => !s.lit)
  }
}

export class OrbNode {
  isBase?: boolean; // where the controller connects and outputs it's channels
  id: number;
  hubType?: HubType;
  segments: OrbSegment[] = [];
  neighbors: OrbNode[] = [];

  setNeighbors(allNodes: OrbNode[], ...nodeIndexes: number[]) {
    this.neighbors = [];
    nodeIndexes.forEach((idx) => {
      this.neighbors.push(allNodes[idx]);
    });
  }

  setSegments(allSegments: OrbSegment[], ...segmentIndexes: number[]) {
    this.segments = [];
    segmentIndexes.forEach((idx) => {
      this.segments.push(allSegments[idx]);
      allSegments[idx]?.nodes.push(this);
    });
  }
  constructor(idx: number) {
    this.id = idx;
  }
}

export class OrbSegment {
  id: number;
  leds: number = 45; // not relevant for path calculations (yet) just modeling.
  thick: boolean = false;
  nodes: OrbNode[] = [];
  inSegment?: OrbSegment;
  outSegment?: OrbSegment;

  private _baseNodeId?: number;
  public set baseNodeId(n: number) {
    this._baseNodeId = n;
  }
  public get baseNodeId(): number {
    return this._baseNodeId ?? this.inSegment.baseNodeId;
  }

  public get ledsInPath() {
    return this.leds + (this.inSegment ? this.inSegment.ledsInPath : 0)
  }

  private _lit = false;
  public set lit(isLit: boolean) {
    this._lit = isLit;
  }
  public get lit() {
    return this._lit || (this.inSegment != null && this.inSegment.lit);
  }

  private _pathPosition = -1;
  public get pathPosition(): number {
    if (this.inSegment) return this.inSegment.pathPosition + 1;
    return this._pathPosition;
  }
  public set pathPosition(p: number) {
    this._pathPosition = p;
  }

  constructor(idx: number) {
    this.id = idx;
  }
}

export class OrbPathConfiguration {
  public channel0Path: number[] = [];
  public channel1Path: number[] = [];
  public channel2Path: number[] = [];
  public channel3Path: number[] = [];
  public litSegmentIds: number[] = [];
  public startingNode: number = -1;
}
