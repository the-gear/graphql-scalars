import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind, ValueNode } from 'graphql';
import { getValueOf } from '../utils';
import DecimalCurrency, { DecimalCurrencyRegExp } from './decimalcurrency';

function serialize(value: DecimalCurrency | unknown) {
  if (value instanceof DecimalCurrency) {
    return value.toString();
  }
  const result = getValueOf(value);
  // Serialize string, boolean and number values to a string, but do not
  // attempt to coerce object, function, symbol, or other types as strings.
  if (typeof result === 'string') {
    if (DecimalCurrencyRegExp.test(result)) return result;
  }
  throw new TypeError(`DecimalCurrency cannot represent value: ${value}`);
}

function parseLiteralDecimal(
  ast: ValueNode,
  variables: { [name: string]: unknown } | null | undefined,
): string | undefined {
  switch (ast.kind) {
    case Kind.INT:
    case Kind.FLOAT:
    case Kind.STRING: {
      return ast.value;
    }
    case Kind.VARIABLE: {
      // tslint:disable-next-line:no-unsafe-any
      return variables ? String(variables[ast.name.value]) : undefined;
    }
    default:
      throw new Error(`parseLiteralDecimal ${ast.kind}`);
  }
}

// TODO: Use parser from decimal
function parseLiteralCurrency(
  ast: ValueNode,
  variables: { [name: string]: unknown } | null | undefined,
): string | undefined {
  switch (ast.kind) {
    case Kind.ENUM:
    case Kind.STRING: {
      return ast.value;
    }
    case Kind.VARIABLE: {
      // tslint:disable-next-line:no-unsafe-any
      return variables && variables[ast.name.value]
        ? (variables[ast.name.value] as object).toString()
        : undefined;
    }
    default:
      throw new Error(`parseLiteralCurrency ${ast.kind}`);
  }
}

export function parseLiteral(
  ast: ValueNode,
  variables: { [name: string]: unknown } | null | undefined,
): DecimalCurrency | undefined | null {
  switch (ast.kind) {
    case Kind.STRING:
      return DecimalCurrency.parse(ast.value);
    case Kind.NULL:
      return null;
    case Kind.VARIABLE: {
      if (variables && variables[ast.name.value]) {
        // tslint:disable-next-line:no-unsafe-any
        return DecimalCurrency.from(variables[ast.name.value]);
      }

      return;
    }
    case Kind.OBJECT: {
      const objValues = ast.fields.reduce(
        (acc, field) => {
          acc[field.name.value] = field.value;

          return acc;
        },
        {} as { [name: string]: ValueNode },
      );
      if (objValues.decimal && objValues.currency) {
        const decimal = parseLiteralDecimal(objValues.decimal, variables);
        const currency = parseLiteralCurrency(objValues.currency, variables);
        if (decimal && currency) {
          return new DecimalCurrency(decimal, currency);
        }
        throw new TypeError(`Cannot construct DecimalCurrency as '${decimal} ${currency}'`);
      }
      throw new TypeError(`Cannot construct DecimalCurrency from object literal`);
    }
    default:
      return;
  }
}

const typeConfig: GraphQLScalarTypeConfig<DecimalCurrency | string, string> = {
  name: 'DecimalCurrency',
  description: 'The Decimal with Currency code',
  serialize,
  parseValue: DecimalCurrency.from,
  parseLiteral,
};

export default new GraphQLScalarType(typeConfig);
