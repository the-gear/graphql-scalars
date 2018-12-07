import { DecimalCurrency } from '..';

const validStrRepresentations: string[] = ['0 USD', '-5 CZK', '20 EUR', '0.456 BTC'];

describe('DecimalCurrency', () => {
  describe('from', () => {
    it('accepts string value', () => {
      validStrRepresentations.forEach((str) => {
        const obj = DecimalCurrency.from(str);
        expect(obj).toBeInstanceOf(DecimalCurrency);
        expect(obj && obj.toString()).toEqual(str);
      });
    });

    it('accepts object value', () => {
      const obj = DecimalCurrency.from({
        decimal: 123,
        currency: 'CZK',
      });
      expect(obj).toBeInstanceOf(DecimalCurrency);
      // expect(obj && obj.toString()).toEqual(str);
    });
  });
});
