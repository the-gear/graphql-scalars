type Decimal = string & { __tag: 'Decimal' };
type Currency = string & { __tag: 'Currency' };

interface DecimalCurrencyValue {
  decimal: Decimal;
  currency: Currency;
}

export const DecimalRegExp = /^[+-]?\d+(?:\.\d+)?$/;
export const CurrencyRegExp = /^[A-Z]+$/;
export const DecimalCurrencyRegExp = /^([+-]?\d+(?:\.\d+)?)\s+([A-Z]+)$/;

function isDecimal(value: string): value is Decimal {
  return DecimalRegExp.test(value);
}

function isCurrency(value: string): value is Currency {
  return CurrencyRegExp.test(value);
}

export default class DecimalCurrency implements DecimalCurrencyValue {
  static from(value: { decimal: Decimal; currency: Currency } | DecimalCurrency): DecimalCurrency;
  static from(
    value: string | { decimal?: string | number | bigint; currency?: string },
  ): DecimalCurrency | undefined;
  static from(value: null | undefined): undefined;
  static from(value: unknown): DecimalCurrency | undefined {
    if (value === null || typeof value === 'undefined') {
      return;
    }
    if (value instanceof DecimalCurrency) {
      return new DecimalCurrency(value.decimal, value.currency, true);
    }
    if (typeof value === 'string') {
      return DecimalCurrency.parse(value);
    }
    if (typeof value === 'object' && value) {
      const { decimal, currency } = value as DecimalCurrencyValue;
      if (typeof decimal !== 'undefined' && currency) {
        return new DecimalCurrency(decimal, currency);
      }

      return;
    }
  }

  static parse(value: string): DecimalCurrency | undefined {
    if (typeof value === 'string') {
      const match = value.match(DecimalCurrencyRegExp);
      if (match) {
        return new DecimalCurrency(match[1] as Decimal, match[2] as Currency, true);
      }
    }
  }

  decimal: Decimal;
  currency: Currency;

  constructor(decimalCurrency: string);
  constructor(decimal: string, currency: string); // tslint:disable-line:unified-signatures
  constructor(decimal: Decimal, currency: Currency, trust: true); // tslint:disable-line:unified-signatures
  constructor(
    decimal: Decimal | string | number | any,
    currency?: Currency | string,
    trust?: boolean,
  ) {
    const strDecimal = String(decimal);
    if (currency) {
      if (trust) {
        this.decimal = strDecimal as Decimal;
        this.currency = currency as Currency;
      } else {
        if (isDecimal(strDecimal) && isCurrency(currency)) {
          this.decimal = strDecimal;
          this.currency = currency;
        } else {
          throw new TypeError(`Invalid Decimal format`);
        }
      }
    } else {
      const match = strDecimal.match(DecimalCurrencyRegExp);
      if (!match) {
        throw new TypeError(`Cannot create DecimalCurrency from value '${decimal}'`);
      }
      this.decimal = match[1] as Decimal;
      this.currency = match[2] as Currency;
    }
  }

  serialize(): string {
    return `${this.decimal} ${this.currency}`;
  }

  toString(): string {
    return this.serialize();
  }

  getDecimal(): Decimal {
    return this.decimal;
  }

  getCurrency(): Currency {
    return this.currency;
  }
}
