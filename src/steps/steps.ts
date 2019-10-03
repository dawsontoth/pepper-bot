import {connectShell} from '../methods/connect-shell';
import {packageName} from '../models/constants';
import {shell} from '../models/state';
import {IStep} from '../models/step';

export const steps: IStep[] = [
  {
    title: `Connect ADB`,
    run: async () => connectShell(),
  },
  // {
  //   title: 'Dismiss Leaderboard Beta',
  //   run: async () => shell().stdin.write('input tap 20 80\n'),
  //   waitAfterRun: 4,
  // },
  {
    title: 'Switch to Library',
    run: async () => shell().stdin.write('input tap 1190 1043\n'),
    waitAfterRun: 10,
  },
  {
    title: 'Swipe Up',
    run: async () => shell().stdin.write('input swipe 1000 800 1000 300 1000\n'),
    waitAfterRun: 2,
  },
  {
    title: 'Open a Trainer',
    run: async () => shell().stdin.write('input tap 370 670\n'),
    waitAfterRun: 9,
  },
  {
    title: 'Open a Program',
    run: async () => shell().stdin.write('input tap 250 950\n'),
    waitAfterRun: 6,
  },
  {
    title: `Restarting App`,
    run: async () => {
      shell().stdin.write(`am force-stop ${packageName}\n`
        + `monkey -p ${packageName} -c android.intent.category.LAUNCHER 1\n`,
      );
    },
  },
];
