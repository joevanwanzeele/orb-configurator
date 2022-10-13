import * as _ from 'lodash';

export type HubType = 5 | 6;
export type StripLength = 45 | 51;
export const TOTAL_NODES = 26;
export const TOTAL_SEGMENTS = 65;

export class Orb {
  nodes: Node[] = [];
  segments: Segment[] = [];
  mostLit: number = 0;
  bestPath: number[][] = [];

  initializeOrb() {
    this.segments = [];
    this.nodes = [];

    for (var i = 0; i < TOTAL_SEGMENTS; i++) {
      this.segments.push(new Segment(i));
    }

    for (var i = 0; i < TOTAL_NODES; i++) {
      this.nodes.push(new Node(i));
    }

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
    node16.setNeighbors(this.nodes, 6, 7, 17, 25);
    node16.setSegments(this.segments, 36, 37, 55, 64);

    var node17 = this.nodes[17];
    node17.hubType = 6;
    node17.setNeighbors(this.nodes, 7, 8, 16, 18);
    node17.setSegments(this.segments, 38, 39, 55, 56);

    var node18 = this.nodes[18];
    node18.hubType = 6;
    node18.setNeighbors(this.nodes, 8, 9, 17, 19);
    node18.setSegments(this.segments, 40, 41, 56, 57);

    var node19 = this.nodes[19];
    node19.hubType = 6;
    node19.setNeighbors(this.nodes, 9, 10, 18, 20);
    node19.setSegments(this.segments, 42, 43, 57, 58);

    var node20 = this.nodes[20];
    node20.hubType = 6;
    node20.setNeighbors(this.nodes, 10, 11, 19, 21);
    node20.setSegments(this.segments, 44, 45, 58, 59);

    var node21 = this.nodes[21];
    node21.hubType = 6;
    node21.setNeighbors(this.nodes, 11, 12, 20, 22);
    node21.setSegments(this.segments, 46, 47, 59, 60);

    var node22 = this.nodes[22];
    node22.hubType = 6;
    node22.setNeighbors(this.nodes, 12, 13, 21, 23);
    node22.setSegments(this.segments, 48, 49, 60, 61);

    var node23 = this.nodes[23];
    node23.hubType = 6;
    node23.setNeighbors(this.nodes, 13, 14, 22, 24);
    node23.setSegments(this.segments, 50, 51, 61, 62);

    var node24 = this.nodes[24];
    node24.hubType = 6;
    node24.setNeighbors(this.nodes, 14, 15, 23, 25);
    node24.setSegments(this.segments, 52, 53, 62, 63);

    var node25 = this.nodes[25];
    node25.hubType = 6;
    node25.setNeighbors(this.nodes, 15, 6, 24, 16);
    node25.setSegments(this.segments, 54, 35, 63, 64, 37);
  }

  getBestPaths(startingNodeId: number = 0) {
    //init orb
    console.log('resetting orb..');
    console.log('next attempt, starting at hub/node ', startingNodeId);
    this.initializeOrb();

    //init channels
    var base = this.nodes[startingNodeId];
    base.isBase = true;
    var startSegments = _.sampleSize(base.segments, 4); //randomly select 4

    startSegments.forEach((s) => {
      s.lit = true;
      s.pathPosition = 0;
    });

    console.log('startingSegments: ', startSegments);

    //first extension
    var result = this.getNextSegmentId();
    var previousSegmentId = result[0];
    var nextSegmentId = result[1];

    console.log('starting segment: ', previousSegmentId);
    console.log('next segment: ', nextSegmentId);

    while (!this.allLit() && nextSegmentId != -1) {
      this.segments[nextSegmentId].inSegment = this.segments[previousSegmentId];
      this.segments[previousSegmentId].outSegment =
        this.segments[nextSegmentId];
      var next = this.getNextSegmentId();
      previousSegmentId = next[0];
      nextSegmentId = next[1];
    }

    var total = this.totalLit();
    console.log('total lit this attempt: ', this.totalLit());
    console.log('most lit so far: ', this.mostLit);
    if (total > this.mostLit) {
      //new best path
      this.mostLit = total;
      this.bestPath = this.getPaths();
      console.log('setting new max value: ', this.mostLit);
    }
  }

  getPaths(): number[][] {
    var base = this.nodes.find((n: Node) => n.isBase == true);
    var channel0path: number[] = [];
    var channel1path: number[] = [];
    var channel2path: number[] = [];
    var channel3path: number[] = [];

    var startingSegments =
      base?.segments.filter((s: Segment) => s.inSegment == null && s.lit) ?? [];
    if (startingSegments[0])
      channel0path = this.getPath(startingSegments[0], []);
    if (startingSegments[1])
      channel1path = this.getPath(startingSegments[1], []);
    if (startingSegments[2])
      channel2path = this.getPath(startingSegments[2], []);
    if (startingSegments[3])
      channel3path = this.getPath(startingSegments[3], []);
    return [channel0path, channel1path, channel2path, channel3path];
  }

  getPath(s: Segment, path: number[]): number[] {
    if (!s.outSegment) return path;
    path.push(s.outSegment.id);
    return this.getPath(s.outSegment, path);
  }

  getNextSegmentId(): number[] {
    let returnSegment!: Segment;
    let segToExtend!: Segment;
    var returnSegmentId = -1;
    // find shortest path
    // select a segment randomly from available options

    //first, get lit segments with no outsegment
    var pathEnds = this.segments.filter(
      (s) => s.lit == true && s.outSegment == null
    );
    if (pathEnds.length == 0) return [-1, -1];

    //of those, select one with the shortest path to the base
    pathEnds = _.orderBy(pathEnds, 'pathPosition');
    //console.log("path end segments, ordered by distance from base: ", pathEnds)
    // console.log(
    //   'length of path end segments.. should always be 4; right?',
    //   pathEnds.length
    // );
    let attemptedIdx = -1;

    while (returnSegmentId == -1 && attemptedIdx < --pathEnds.length) {
      attemptedIdx++;
      segToExtend = pathEnds[attemptedIdx] as Segment;
      // console.log("attemptedIdx: ", attemptedIdx);
      // console.log("pathEnds: ", pathEnds);
      // console.log("segtoextend: ", pathEnds[attemptedIdx])
      var nodeOptions = segToExtend.nodes.filter(
        (n) => !n.isBase && segToExtend.inSegment == null
      ); // for the first segment, we just need to select the node that isn't the base
      var nextNode: Node;
      if (nodeOptions.length == 1) nextNode = nodeOptions[0];
      else {
        var currentNodes = segToExtend?.nodes ?? [];
        var previousNodes = segToExtend?.inSegment?.nodes ?? [];
        nextNode = _.difference(currentNodes, previousNodes)[0] as Node; //if not the first segment, select the node that wasn't already traversed.
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
    return this.segments.every((s) => s.lit == true);
  }

  totalLit() {
    return this.segments.filter((s) => s.lit == true).length;
  }
}

export class Node {
  isBase?: boolean; // is it where the controller connects?
  id: number;
  hubType?: HubType;
  segments: Segment[] = [];
  neighbors: Node[] = [];

  setNeighbors(allNodes: Node[], ...nodeIndexes: number[]) {
    this.neighbors = [];
    nodeIndexes.forEach((idx) => {
      this.neighbors.push(allNodes[idx]);
    });
  }

  setSegments(allSegments: Segment[], ...segmentIndexes: number[]) {
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

export class Segment {
  id: number;
  length: StripLength = 45; // not relevant for path calculations (yet) just modeling.
  thick: boolean = false;
  nodes: Node[] = [];
  inSegment?: Segment;
  outSegment?: Segment;
  private _lit = false;
  private _pathPosition = -1;
  public set lit(isLit: boolean) {
    this._lit = isLit;
  }
  public get lit() {
    return this._lit || (this.inSegment != null && this.inSegment.lit);
  }
  constructor(idx: number) {
    this.id = idx;
  }
  public get pathPosition(): number {
    if (this.inSegment) return this.inSegment.pathPosition + 1;
    return this._pathPosition;
  }
  public set pathPosition(p: number) {
    this._pathPosition = p;
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
