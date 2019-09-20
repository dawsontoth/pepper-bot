import {ChildProcessWithoutNullStreams} from 'child_process';

let instance: ChildProcessWithoutNullStreams | null = null;

export function shell(val?: null | ChildProcessWithoutNullStreams): ChildProcessWithoutNullStreams {
  if (val !== undefined) {
    instance = val;
  }
  return instance as ChildProcessWithoutNullStreams;
}
