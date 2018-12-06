/**
 * https://gist.github.com/langpavel/b30f3d507a47713b0c6e89016e4e9eb7
 */

import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind, ValueNode } from 'graphql';
import { getValueOf } from '../utils';

const RE_DECIMAL = /^[+-]?\d+(\.\d+)?$/;

function serialize(value: unknown): string {
  // Support serializing objects with custom valueOf() functions - a common way
  // to represent an complex value which can be represented as a string
  // (ex: MongoDB id objects).
  const result: unknown = getValueOf(value);
  // Serialize string, boolean and number values to a string, but do not
  // attempt to coerce object, function, symbol, or other types as strings.
  if (typeof result === 'string') {
    if (RE_DECIMAL.test(result)) return result;
  } else if (typeof result === 'number' && isFinite(result)) {
    let str = result.toString();
    if (RE_DECIMAL.test(str)) return str;
    str = result.toFixed(20);
    if (RE_DECIMAL.test(str)) return str;
  }
  throw new TypeError(`Decimal cannot represent value: ${value}`);
}

function parseValue(value: unknown): string {
  if (typeof value !== 'string') {
    throw new TypeError(`Decimal cannot represent a non string value: ${value}`);
  }

  return value;
}

function parseLiteral(ast: ValueNode) {
  if (ast.kind === Kind.INT) {
    return ast.value;
  } else if (ast.kind === Kind.STRING || ast.kind === Kind.FLOAT) {
    if (RE_DECIMAL.test(ast.value)) return ast.value;
  }

  return undefined;
}

const typeConfig: GraphQLScalarTypeConfig<string, string> = {
  name: 'Decimal',
  description: 'The Decimal as string',
  serialize,
  parseValue,
  parseLiteral,
};

export default new GraphQLScalarType(typeConfig);
