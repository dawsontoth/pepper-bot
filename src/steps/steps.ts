import {connectShell} from '../methods/connect-shell';
import {packageName} from '../models/constants';
import {shell} from '../models/state';
import {IStep} from '../models/step';

export const steps: IStep[] = [
  {
    title: `Connect ADB`,
    run: async () => connectShell(),
  },
  {
    title: 'Dismiss Leaderboard Beta',
    run: async () => shell().stdin.write('input tap 20 80\n'),
    waitAfterRun: 4,
  },
  {
    title: 'Switch to Library',
    run: async () => shell().stdin.write('input tap 1200 1070\n'),
    waitAfterRun: 12,
  },
  {
    title: 'Open a Trainer',
    run: async () => shell().stdin.write('input tap 1218 850\n'),
    waitAfterRun: 8,
  },
  // {
  //   title: 'Open a Program',
  //   run: async () => shell().stdin.write('input tap 1218 850\n'),
  //   waitAfterRun: 8,
  // },
  {
    title: `Restarting App`,
    run: async () => {
      shell().stdin.write(`am force-stop ${packageName}\n`
        + `monkey -p ${packageName} -c android.intent.category.LAUNCHER 1\n`,
      );
    },
  },
];
