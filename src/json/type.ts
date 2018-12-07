import {
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
  Kind,
  ObjectFieldNode,
  ObjectValueNode,
  ValueNode,
} from 'graphql';

export function parseObject(
  ast: ObjectValueNode,
  variables: GraphQLVariables,
): { [name: string]: unknown } {
  const value = Object.create(null) as { [name: string]: unknown };
  ast.fields.forEach((field: ObjectFieldNode) => {
    value[field.name.value] = parseLiteral(field.value, variables);
  });

  return value;
}

export function parseLiteral(ast: ValueNode, variables: GraphQLVariables): unknown {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT:
      return parseObject(ast, variables);
    case Kind.LIST:
      return ast.values.map((n) => parseLiteral(n, variables));
    case Kind.NULL:
      return null;
    case Kind.VARIABLE: {
      // tslint:disable-next-line:no-unsafe-any
      return variables ? variables[ast.name.value] : undefined;
    }
    default:
      throw new TypeError(`JSON: Cannot parse AST node of type ${ast.kind}`);
  }
}

const description =
  'The `JSON` scalar type represents JSON values as specified by ' +
  '[ECMA-404](http://www.ecma-international.org/' +
  'publications/files/ECMA-ST/ECMA-404.pdf).';

const typeConfig: GraphQLScalarTypeConfig<unknown, unknown> = {
  name: 'JSON',
  description,
  serialize: (value) => value, // tslint:disable-line:no-unsafe-any
  parseValue: (value) => value, // tslint:disable-line:no-unsafe-any
  parseLiteral,
};

export default new GraphQLScalarType(typeConfig);
