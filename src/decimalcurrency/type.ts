import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind, ValueNode } from 'graphql';
import { getValueOf } from '../utils';

const RE_DECIMAL_CURRENCY = /^([+-]?\d+(?:\.\d+)?)\s+([A-Z]+)$/;

type Decimal = string;
type Currency = string;

class DecimalCurrency {
  static from(value: unknown): DecimalCurrency | null {
    if (value instanceof DecimalCurrency) {
      return value;
    }
    if (typeof value === 'string') {
      return DecimalCurrency.parse(value);
    }

    return null;
  }

  static parse(value: string): DecimalCurrency | null {
    if (typeof value === 'string') {
      const match = value.match(RE_DECIMAL_CURRENCY);
      if (match) {
        return new DecimalCurrency(match[1], match[2]);
      }
    }

    return null;
  }

  decimal: Decimal;
  currency: Currency;

  constructor(decimal: Decimal, currency: Currency) {
    this.decimal = decimal;
    this.currency = currency;
  }

  toJSON(): string {
    return `${this.decimal} ${this.currency}`;
  }

  toString(): string {
    return this.toJSON();
  }

  getDecimal(): Decimal {
    return this.decimal;
  }

  getCurrency(): Currency {
    return this.currency;
  }
}

function serialize(value: DecimalCurrency | unknown) {
  if (value instanceof DecimalCurrency) {
    return value.toJSON();
  }
  const result = getValueOf(value);
  // Serialize string, boolean and number values to a string, but do not
  // attempt to coerce object, function, symbol, or other types as strings.
  if (typeof result === 'string') {
    if (RE_DECIMAL_CURRENCY.test(result)) return result;
  }
  throw new TypeError(`DecimalCurrency cannot represent value: ${value}`);
}

function parseValue(value: unknown): DecimalCurrency | null {
  if (typeof value === 'string') {
    return DecimalCurrency.parse(value);
  }
  throw new TypeError(`DecimalCurrency cannot represent a non string value: ${value}`);
}

function parseLiteral(ast: ValueNode): DecimalCurrency | null {
  if (ast.kind === Kind.STRING) {
    if (RE_DECIMAL_CURRENCY.test(ast.value)) return DecimalCurrency.parse(ast.value);
  }

  return null;
}

const scalarTypeConfig: GraphQLScalarTypeConfig<DecimalCurrency | string, string> = {
  name: 'DecimalCurrency',
  description: 'The Decimal with Currency code',
  serialize,
  parseValue,
  parseLiteral,
};

export default new GraphQLScalarType(scalarTypeConfig);
