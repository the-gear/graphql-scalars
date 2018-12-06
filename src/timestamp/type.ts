/**
 * https://gist.github.com/langpavel/b30f3d507a47713b0c6e89016e4e9eb7
 */

import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind, ValueNode } from 'graphql';

function serialize(value: unknown): number | null {
  if (value instanceof Date) {
    return value.getTime();
  } else if (typeof value === 'number') {
    return Math.trunc(value);
  } else if (typeof value === 'string') {
    return Date.parse(value);
  }

  return null;
}

function parseValue(value: number | string | null): Date | null {
  if (value === null) {
    return null;
  }

  try {
    return new Date(value);
  } catch (err) {
    return null;
  }
}

function parseLiteral(ast: ValueNode): Date | null {
  if (ast.kind === Kind.INT) {
    return new Date(parseInt(ast.value, 10));
  } else if (ast.kind === Kind.STRING) {
    return parseValue(ast.value);
  }

  return null;
}

const description = `The JavaScript *Date* as integer.
Type represents date and time as number of milliseconds from start of UNIX epoch.
Use \`new Date()\` for parse and \`date.getTime()\` for serialize`;

const typeConfig: GraphQLScalarTypeConfig<Date, number> = {
  name: 'Timestamp',
  description,
  serialize,
  parseValue,
  parseLiteral,
};

export default new GraphQLScalarType(typeConfig);
