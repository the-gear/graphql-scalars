/**
 * https://gist.github.com/langpavel/b30f3d507a47713b0c6e89016e4e9eb7
 */

import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind, ValueNode } from 'graphql';
import { getValueOf } from '../utils';

const RE_DATE = /^\d{4}-\d{1,2}-\d{1,2}?$/;

function pad(num: number): string {
  if (num < 10) {
    // tslint:disable-next-line:prefer-template
    return '0' + num;
  }

  return num.toString();
}

function getDateStr(date: Date) {
  return [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join('-');
}

function serialize(value: unknown) {
  if (value instanceof Date) {
    const str = getDateStr(value);
    if (RE_DATE.test(str)) return str;
  }

  // Support serializing objects with custom valueOf() functions - a common way
  // to represent an complex value which can be represented as a string
  // (ex: MongoDB id objects).
  const result = getValueOf(value);
  if (result instanceof Date) {
    const str = getDateStr(result);
    if (RE_DATE.test(str)) return str;
  } else if (typeof result === 'string') {
    if (RE_DATE.test(result)) return result;
  }

  throw new TypeError(`Date cannot represent value: ${value}`);
}

function parseValue(value: unknown): string {
  if (typeof value === 'string') {
    if (!RE_DATE.test(value)) {
      throw new TypeError(`Date cannot represent a string value: ${value}`);
    }

    return value;
  }
  throw new TypeError(`Date cannot represent a non string value: ${value}`);
}

function parseLiteral(ast: ValueNode) {
  if (ast.kind === Kind.STRING) {
    if (RE_DATE.test(ast.value)) return ast.value;
  }

  return undefined;
}

const typeConfig: GraphQLScalarTypeConfig<string, string> = {
  name: 'Date',
  description: 'The Date as YYYY-MM-DD string',
  serialize,
  parseValue,
  parseLiteral,
};

export default new GraphQLScalarType(typeConfig);
