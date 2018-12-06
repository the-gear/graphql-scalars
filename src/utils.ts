// Support serializing objects with custom valueOf() functions - a common way
// to represent an complex value which can be represented as a string
// (ex: MongoDB id objects).
export function getValueOf(value: any): unknown {
  // tslint:disable-next-line:no-unsafe-any
  return value && typeof value.valueOf === 'function' ? value.valueOf() : value;
}
