// tslint:disable:no-unsafe-any
import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLSchema, graphqlSync } from 'graphql';

import { DecimalCurrency, GraphQLDecimalCurrency } from '..';

describe('GraphQLDecimalCurrency', () => {
  let schema: GraphQLSchema;

  beforeEach(() => {
    schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {
          value: {
            type: GraphQLDecimalCurrency,
            args: {
              arg: {
                type: GraphQLDecimalCurrency,
              },
            },
            resolve: (_, { arg }) => arg,
          },
          argIsDecimalCurrency: {
            type: GraphQLBoolean,
            args: {
              arg: {
                type: GraphQLDecimalCurrency,
              },
            },
            resolve: (_, { arg }) => arg instanceof DecimalCurrency,
          },
        },
      }),
      types: [GraphQLInt],
    });
  });

  describe('serialize', () => {
    it('should support serialization', () => {
      ['0 USD', '-1 CZK', '19.95 USD'].forEach((value) => {
        expect(GraphQLDecimalCurrency.serialize(DecimalCurrency.from(value))).toEqual(value);
      });
    });

    it('should support serialization', () => {
      ['0 USD', '-1 CZK', '10.01 USD'].forEach((value) => {
        expect(GraphQLDecimalCurrency.serialize(value)).toEqual(value);
      });
    });
  });

  describe('parseValue', () => {
    it('should support parsing string values', () => {
      const { data } = graphqlSync(
        schema,
        'query ($arg: DecimalCurrency!) { value(arg: $arg) argIsDecimalCurrency(arg: $arg) }',
        null,
        null,
        {
          arg: '123.40 EUR',
        },
      );

      expect(data && data.value).toEqual('123.40 EUR');
      expect(data && data.argIsDecimalCurrency).toStrictEqual(true);
    });

    it('should support parsing object values', () => {
      const { data, errors } = graphqlSync(
        schema,
        `query (
          $arg: DecimalCurrency!
          # $int: Int, $float: Float, $str: String, $strCode:String
        ) {
          val1: value(arg: $arg)
          # val2: value(arg: { decimal: $str currency: $strCode } ) # NOT WORK!
          # val3: value(arg: { decimal: $int currency: CZK } ) # NOT WORK!
          # val4: value(arg: { decimal: $float currency: USD } ) # NOT WORK!
          argIsDecimalCurrency(arg: $arg)
        }`,
        null,
        null,
        {
          arg: { decimal: '123.40', currency: 'EUR' },
          // int: 123, float: 19.95, str: '5678.90', strCode: 'USD',
        },
      );

      expect(errors).toBeFalsy();
      expect(data && data.val1).toEqual('123.40 EUR');
      expect(data && data.argIsDecimalCurrency).toStrictEqual(true);
    });
  });

  describe('parseLiteral', () => {
    it('should handle string literals', () => {
      const { data } = graphqlSync(
        schema,
        `
          {
            value(arg: "3.14 USD")
          }
        `,
      );
      expect(data).toEqual({
        value: '3.14 USD',
      });
    });

    it('should handle object literals', () => {
      const { data, errors } = graphqlSync(
        schema,
        `query {
          val1: value(arg: { decimal: "0.00000001" currency: "BTC" })
          val2: value(arg: { decimal:  0.00000002  currency:  BTC })
          val3: value(arg: { decimal:  0.00000003  currency:  BTC })
          val4: value(arg: { decimal: 4 currency: CZK })
          val5: value(arg: { decimal: 3.14 currency: EUR })
        }`,
      );

      expect(errors).toBeFalsy();
      expect(data).toEqual({
        val1: '0.00000001 BTC',
        val2: '0.00000002 BTC',
        val3: '0.00000003 BTC',
        val4: '4 CZK',
        val5: '3.14 EUR',
      });
    });

    it('should handle null literals', () => {
      const { data } = graphqlSync(
        schema,
        `
          {
            value(arg: null)
          }
        `,
      );
      expect(data).toEqual({
        value: null,
      });
    });

    it('should reject invalid literals', () => {
      const { data } = graphqlSync(
        schema,
        `
          {
            value(arg: INVALID)
          }
        `,
      );
      expect(data).toBeUndefined();
    });
  });
});
