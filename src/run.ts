import {logSteps} from './models/constants';
import {steps} from './models/steps';
import {delay} from './utils/delay';

export async function run() {
  logSteps && process.stdout.write('\x1Bc');
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    try {
      logSteps && console.log(step.title);
      if (step.run) {
        await step.run();
      }
    } catch (err) {
      console.error(err);
      break;
    } finally {
      await delay(step.waitAfterRun);
    }
  }
}
