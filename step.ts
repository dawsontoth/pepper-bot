export interface IStep {
  title: string;
  bar?: any;
  run?: () => Promise<any>
  waitAfterRun: number;
}
