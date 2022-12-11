/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
//import { Orb } from "./models/orb.model";
//import * as _ from 'lodash';
// excludes default libs such as 'dom' conflicting with 'webworker'
//// <reference no-default-lib="true"/>
//import { Subject } from 'rxjs';
//import { Orb } from "./models/orb.model";



// this should be what you use in your scripts
///// <reference lib="es2022" />



 addEventListener('message', ({ data }) => {
  const response = "got message " + data;
  //var orb = new Orb();

//   var orb = data.;
//   var maxAttempts = data.maxAttempts;
//   var startingNodeIds = data.startingNodeIds;

//   orb.initializeOrb();
//   //console.log('running it.. maxAttempts = ', maxAttempts);
//   //console.log('are they all lit??  ', this.allLit())
//   var attempts = 0;
//   orb.$newBestEvent.subscribe(n => postMessage.bind(this)(n))
//   while (!orb.allLit() && attempts < maxAttempts) {
//     //console.log('in the loop..');
//     orb.getBestPaths(startingNodeIds).then(() => {
//       attempts++;
//       orb.attemptTally++;
//       orb.initializeOrb();
//     });
//   }
//   let response = {
//     done: true,
//     bestPath: orb.bestPath,
//     bestPaths: orb.bestPaths,
//     fewestUnlit: orb.fewestUnlit,
//     startingNodes: orb.startingNodes,
//     attemptTally: orb.attemptTally,
//     mostList: orb.mostLit,
//     attemptsUntilBest: orb.attemptsUntilBest
//   }
  postMessage(response)
});