//import { AngularWebWorker, bootstrapWorker, Callable, OnWorkerInit } from "angular-web-worker";
///// <reference lib="webworker" />
//import { Orb } from "./models/orb.model";

//import { expose } from "threads/worker"
//import { Orb } from "./models/orb.model";

// @AngularWebWorker()
// export class OrbWorker implements OnWorkerInit{ 
 
//     constructor() {}
 
//     onWorkerInit() {
//       console.log('Worker initialized');
//     }

//     @Callable()
//     runCheckPaths(orb: any, maxAttempts: number, startingNodeIds: number[]) {
//       console.log(`web worker function called; orb = ${orb}, maxAttempts = ${maxAttempts}, startingNodeIds = ${startingNodeIds}`);
    
//       //var orb = data.orb as Orb;
//       //var maxAttempts = data.maxAttempts;
//       //var startingNodeIds = data.startingNodeIds;
    
//       orb.initializeOrb();
//       //console.log('running it.. maxAttempts = ', maxAttempts);
//       //console.log('are they all lit??  ', this.allLit())
//       var attempts = 0;
//       orb.$newBestEvent.subscribe(n => postMessage(n))
//       while (!orb.allLit() && attempts < maxAttempts) {
//         //console.log('in the loop..');
//         orb.getBestPaths(startingNodeIds).then(() => {
//           attempts++;
//           orb.attemptTally++;
//           orb.initializeOrb();
//         });        
//       }
//       postMessage({ done: true })
//     } 
// }
// bootstrapWorker(OrbWorker);