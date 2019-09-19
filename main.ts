import {execSync, spawn} from 'child_process';
import * as schedule from 'node-schedule';
import {Keys} from './keys';
import {IStep} from './step';

const packageName = 'com.ifit.standalone';

const steps: IStep[] = [
  {
    title: `Starting up ${packageName}`,
    run: async () => {
      shell.stdin.write(`monkey -p ${packageName} -c android.intent.category.LAUNCHER 1\n`);
    },
    waitAfterRun: 40,
  },
  {
    title: 'Switching to Library',
    run: async () => {
      shell.stdin.write('input tap 1200 1070\n');
    },
    waitAfterRun: 10,
  },
  {
    title: `Closing ${packageName}`,
    run: async () => {
      const pid = String(execSync(`adb shell ps | grep ${packageName} | awk '{print $2}'`));
      if (!pid || isNaN(+pid)) {
        throw new Error('pid not found! ' + pid);
      }
      shell.stdin.write(`kill ${pid}\ninput keyevent ${Keys.BACK}\n`);
    },
    waitAfterRun: 5,
  },
];

// TODO: Handle shell disconnect.
// TODO: Run in PM2?
const shell = spawn('adb', ['shell']);
shell.stdin.write(`su\n`);

const startsAt = 9;
const endsAt = 19;
const workWeek = new schedule.Range(1, 5);

const priorToBusinessHours = new schedule.RecurrenceRule();
priorToBusinessHours.dayOfWeek = workWeek;
priorToBusinessHours.hour = startsAt - 1;
priorToBusinessHours.minute = 59;
schedule.scheduleJob(priorToBusinessHours, () => {
  if (!screenIsOn()) {
    shell.stdin.write(`input keyevent ${Keys.POWER}\n`);
  }
});

const everyMinuteDuringBusinessHours = new schedule.RecurrenceRule();
everyMinuteDuringBusinessHours.dayOfWeek = workWeek;
everyMinuteDuringBusinessHours.hour = new schedule.Range(startsAt, endsAt);
let running = false;
schedule.scheduleJob(everyMinuteDuringBusinessHours, () => {
  if (!running) {
    running = true;
    run()
      .then(() => running = false)
      .catch(() => running = false);
  }
});

const afterBusinessHours = new schedule.RecurrenceRule();
afterBusinessHours.dayOfWeek = workWeek;
afterBusinessHours.hour = endsAt + 1;
afterBusinessHours.minute = 1;
schedule.scheduleJob(afterBusinessHours, () => {
  if (screenIsOn()) {
    shell.stdin.write(`input keyevent ${Keys.POWER}\n`);
  }
});

async function run() {
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    try {
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

function screenIsOn() {
  return String(execSync(`adb shell dumpsys power`)).indexOf('mWakefulness=Awake') >= 0;
}

async function delay(step: IStep) {
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
