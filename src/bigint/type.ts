import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind, ValueNode } from 'graphql';
import { getValueOf } from '../utils';

const RE_BIGINT = /^[+-]?\d+$/;

function serialize(value: unknown): string | undefined {
  // Support serializing objects with custom valueOf() functions - a common way
  // to represent an complex value which can be represented as a string
  // (ex: MongoDB id objects).
  const result = getValueOf(value);
  // Serialize string, boolean and number values to a string, but do not
  // attempt to coerce object, function, symbol, or other types as strings.
  // tslint:disable-next-line:valid-typeof
  if (typeof result === 'bigint') {
    return result.toString();
  } else if (typeof result === 'string') {
    if (RE_BIGINT.test(result)) return result;
  } else if (typeof result === 'number' && isFinite(result)) {
    const str = result.toFixed();
    if (RE_BIGINT.test(str)) return str;
  }
  throw new TypeError(`BigInt cannot represent value: ${value}`);
}

function parseValue(value: any): string | null | undefined {
  if (typeof value === 'string') {
    return value;
  }

  throw new TypeError(`BigInt cannot represent a non string value: ${value}`);
}

function parseLiteral(ast: ValueNode): string | undefined {
  if (ast.kind === Kind.INT) {
    return ast.value;
  } else if (ast.kind === Kind.STRING || ast.kind === Kind.FLOAT) {
    if (RE_BIGINT.test(ast.value)) return ast.value;
  }

  return undefined;
}

const typeConfig: GraphQLScalarTypeConfig<string, string> = {
  name: 'BigInt',
  description: 'The Integer as string',
  serialize,
  parseValue,
  parseLiteral,
};

export default new GraphQLScalarType(typeConfig);
