import { __DEV__ } from './environment';

export default function debug(msg: string, ...args: any[]): void {
  if (__DEV__) {
    // tslint:disable-next-line:no-console
    console.debug(`[graphql-scalars]: ${msg}`, ...args);
  }
}
