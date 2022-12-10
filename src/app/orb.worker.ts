/// <reference lib="webworker" />
 
import { Orb } from "./models/orb.model";

addEventListener('message', async ({ data }) => {
  console.log("web worker got message " + data);  
  var orb = data.orb as Orb;
  var maxAttempts = data.maxAttempts;
  var startingNodeIds = data.startingNodeIds;

  orb.initializeOrb();
  //console.log('running it.. maxAttempts = ', maxAttempts);
  //console.log('are they all lit??  ', this.allLit())
  var attempts = 0;
  orb.$newBestEvent.subscribe(n => postMessage(n))
  while (!orb.allLit() && attempts < maxAttempts) {
    //console.log('in the loop..');
    await orb.getBestPaths(startingNodeIds);
    attempts++;
    orb.attemptTally++;
    orb.initializeOrb();
  }
  postMessage({done: true})
});

