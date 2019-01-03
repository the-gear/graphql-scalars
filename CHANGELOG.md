# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.0.4"></a>

## [0.0.4](https://github.com/the-gear/graphql-scalars/compare/v0.0.3...v0.0.4) (2019-01-03)

<a name="0.0.2"></a>

## [0.0.2](https://github.com/the-gear/graphql-scalars/compare/v0.0.1...v0.0.2) (2018-12-07)

### Code Refactoring

- rename GraphQL\*Type, remove Type suffix ([838327b](https://github.com/the-gear/graphql-scalars/commit/838327b))

### BREAKING CHANGES

- All exported GraphQL types was renamed

<a name="0.0.1"></a>

## [0.0.1](https://github.com/the-gear/graphql-scalars/compare/v0.0.0...v0.0.1) (2018-12-07)

### Features

- **decimalcurrency:** DecimalCurrency class as value for graphql scalar ([6a83b78](https://github.com/the-gear/graphql-scalars/commit/6a83b78))
- **json:** throw TypeError for unknown AST node ([6de4b43](https://github.com/the-gear/graphql-scalars/commit/6de4b43))

### BREAKING CHANGES

- **decimalcurrency:** DecimalCurrency is completely reimplemented
- **json:** JSON parseLiteral now throw TypeError for unknown AST node kind

<a name="0.0.0"></a>

# 0.0.0 (2018-12-06)

Initial release:

```js
import { GraphQLBigIntType } from '@the-gear/graphql-scalars'; // BigInt
import { GraphQLCurrencyType } from '@the-gear/graphql-scalars'; // Currency
import { GraphQLDateType } from '@the-gear/graphql-scalars'; // Date
import { GraphQLDecimalCurrencyType } from '@the-gear/graphql-scalars'; // DecimalCurrency
import { GraphQLDecimalType } from '@the-gear/graphql-scalars'; // Decimal
import { GraphQLJSONType } from '@the-gear/graphql-scalars'; // JSON
import { GraphQLTimestampType } from '@the-gear/graphql-scalars'; // Timestamp
```
