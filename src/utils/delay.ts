import {logSteps} from '../models/constants';

export async function delay(seconds?: number | undefined) {
  if (!seconds) {
    return;
  }
  let remaining = seconds * 1000;
  logSteps && console.log(`Waiting ${seconds} seconds...`);
  return new Promise(resolve => {
    const intervalID = setInterval(() => {
      remaining -= 100;
      if (remaining <= 0) {
        clearInterval(intervalID);
        resolve();
      }
    }, 100);
  });
}
