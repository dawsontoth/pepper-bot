import {connectShell} from '../methods/connect-shell';
import {shell} from '../models/state';
import {IStep} from '../models/step';

export const steps: IStep[] = [
  {
    title: `Connect ADB`,
    run: async () => connectShell(),
  },
  {
    title: 'Switch to Browse',
    run: async () => shell().stdin.write('input tap 1100 1050\n'),
    waitAfterRun: 15,
  },
  {
    title: 'Switch to Home',
    run: async () => shell().stdin.write('input tap 695 1050\n'),
    waitAfterRun: 15,
  },
  {
    title: 'Switch to Browse',
    run: async () => shell().stdin.write('input tap 1100 1050\n'),
    waitAfterRun: 15,
  },
  {
    title: 'Switch to Home',
    run: async () => shell().stdin.write('input tap 695 1050\n'),
  },
  // {
  //   title: 'Swipe Up',
  //   run: async () => shell().stdin.write('input swipe 1000 800 1000 300 2000\n'),
  //   waitAfterRun: 1,
  // },
  // {
  //   title: 'Open a Trainer',
  //   run: async () => shell().stdin.write('input tap 370 705\n'),
  //   waitAfterRun: 9,
  // },
  // {
  //   title: 'Open a Program',
  //   run: async () => shell().stdin.write('input tap 250 950\n'),
  //   waitAfterRun: 6,
  // },
  // {
  //   title: `Restarting App`,
  //   run: async () => {
  //     shell().stdin.write(`am force-stop ${packageName}\n`
  //       + `monkey -p ${packageName} -c android.intent.category.LAUNCHER 1\n`,
  //     );
  //   },
  // },
];
