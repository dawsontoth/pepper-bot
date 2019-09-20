#!/usr/bin/env node
import {execSync, spawn} from 'child_process';
import {Job, rescheduleJob} from 'node-schedule';
import {Keys} from './keys';
import {IStep} from './step';
import {afterWorkHours, beforeWorkHours, duringWorkHours} from './timing';

const packageName = 'com.ifit.standalone';
const device = '192.168.0.252:5555';
const runOnce = false;
const logSteps = false;

let shell;

const steps: IStep[] = [
  {
    title: `Connect ADB`,
    run: async () => connectShell(),
    waitAfterRun: 0,
  },
  {
    title: 'Switching to Library',
    run: async () => shell.stdin.write('input tap 1200 1070\n'),
    waitAfterRun: 5,
  },
  {
    title: 'Open a Trainer',
    run: async () => shell.stdin.write('input tap 1218 850\n'),
    waitAfterRun: 10,
  },
  {
    title: 'Open a Program',
    run: async () => shell.stdin.write('input tap 1218 850\n'),
    waitAfterRun: 9,
  },
  {
    title: `Restarting ${packageName}`,
    run: async () => {
      // const pid = String(execSync(`adb shell ps | grep ${packageName} | awk '{print $2}'`));
      // if (!pid || isNaN(+pid)) {
      //   throw new Error('pid not found! ' + pid);
      // }
      shell.stdin.write(`am force-stop ${packageName}\n`
        + `monkey -p ${packageName} -c android.intent.category.LAUNCHER 1\n`,
      );
    },
    waitAfterRun: 0,
  },
  {
    title: `Disconnect ADB`,
    run: async () => disconnectShell(),
    waitAfterRun: 0,
  },
];

if (runOnce) {
  run().then(() => console.log('done!'));
} else {

  const before = new Job('Turn On Screen', () => {
    connectShell();
    if (!screenIsOn()) {
      shell.stdin.write(`input keyevent ${Keys.POWER}\n`);
    }
    disconnectShell();
  });

  let running = false;
  const during = new Job('Test Service', () => {
    if (!running) {
      running = true;
      run()
        .then(() => running = false)
        .catch(() => running = false);
    }
  });

  const after = new Job('Turn Off Screen', () => {
    connectShell();
    if (screenIsOn()) {
      shell.stdin.write(`input keyevent ${Keys.POWER}\n`);
    }
    disconnectShell();
  });

  rescheduleJob(before, beforeWorkHours);
  rescheduleJob(during, duringWorkHours);
  rescheduleJob(after, afterWorkHours);
}

async function run() {
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
      await delay(step);
    }
  }
}

async function delay(step: IStep) {
  if (!step.waitAfterRun) {
    return;
  }
  let remaining = step.waitAfterRun * 1000;
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

function screenIsOn() {
  return String(execSync(`adb shell dumpsys power`)).indexOf('mWakefulness=Awake') >= 0;
}

function connectShell() {
  if (shell) {
    disconnectShell();
  }
  execSync(`adb connect ${device}`);
  shell = spawn('adb', ['shell']);
  shell.stdin.write(`su\n`);
}

function disconnectShell() {
  shell.stdin.write('exit\n'); // exits from su
  shell.stdin.write('exit\n'); // exits from adb shell
  shell.stdin.end();
  shell = null;
  execSync(`adb disconnect ${device}`);
}
