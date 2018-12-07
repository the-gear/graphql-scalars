// tslint:disable:no-unsafe-any
import { GraphQLInt, GraphQLObjectType, GraphQLSchema, graphqlSync } from 'graphql';

import { GraphQLJSONType } from '..';

const FIXTURE = {
  string: 'string',
  int: 3,
  float: Math.PI,
  true: true,
  false: true,
  null: null,
  object: {
    string: 'string',
    int: 3,
    float: Math.PI,
    true: true,
    false: true,
    null: null,
  },
  array: ['string', 3, Math.PI, true, false, null],
};

describe('GraphQLJSONType', () => {
  let schema: GraphQLSchema;

  beforeEach(() => {
    schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: {
          value: {
            type: GraphQLJSONType,
            args: {
              arg: {
                type: GraphQLJSONType,
              },
            },
            resolve: (_, { arg }) => arg,
          },
        },
      }),
      types: [GraphQLInt],
    });
  });

  describe('serialize', () => {
    it('should support serialization', () => {
      expect(GraphQLJSONType.serialize(FIXTURE)).toEqual(FIXTURE);
    });
  });

  describe('parseValue', () => {
    it('should support parsing values', () => {
      const { data } = graphqlSync(schema, 'query ($arg: JSON!) { value(arg: $arg) }', null, null, {
        arg: FIXTURE,
      });

      expect(data && data.value).toEqual(FIXTURE);
    });
  });

  describe('parseLiteral', () => {
    it('should support parsing literals', () => {
      const { data } = graphqlSync(
        schema,
        `
          query($intValue: Int = 3) {
            value(
              arg: {
                string: "string"
                int: $intValue
                float: 3.14
                true: true
                false: false
                null: null
                object: {
                  string: "string"
                  int: $intValue
                  float: 3.14
                  true: true
                  false: false
                  null: null
                }
                array: ["string", $intValue, 3.14, true, false, null]
              }
            )
          }
        `,
      );
      expect(data && data.value).toEqual({
        string: 'string',
        int: 3,
        float: 3.14,
        true: true,
        false: false,
        null: null,
        object: {
          string: 'string',
          int: 3,
          float: 3.14,
          true: true,
          false: false,
          null: null,
        },
        array: ['string', 3, 3.14, true, false, null],
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
