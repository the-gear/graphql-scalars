import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind, ValueNode } from 'graphql';
import { getValueOf } from '../utils';

type Currency = string;

function serialize(value: unknown): string {
  const result = getValueOf(value);
  if (typeof result === 'string') {
    return result;
  }
  throw new TypeError(`Currency cannot represent value: ${value}`);
}

function parseValue(value: any): Currency | undefined {
  if (typeof value === 'string') {
    return value;
  }
  throw new TypeError(`Currency cannot represent a non string value: ${value}`);
}

function parseLiteral(ast: ValueNode): Currency | undefined {
  return ast.kind === Kind.STRING ? ast.value : undefined;
}

const typeConfig: GraphQLScalarTypeConfig<Currency, string> = {
  name: 'Currency',
  description: 'The `Currency` code. As string like USD, EUR, CZK, USDT, BTC,…',
  serialize,
  parseValue,
  parseLiteral,
};

export default new GraphQLScalarType(typeConfig);
