# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.0.0"></a>

# 0.0.0 (2018-12-06)

### Bug Fixes

- **build:** allow first-release command ([10294c5](https://github.com/the-gear/graphql-scalars/commit/10294c5))
- **build:** correctly setup uglify options ([6c0f4b2](https://github.com/the-gear/graphql-scalars/commit/6c0f4b2))
- **build:** don't compile test files ([221c277](https://github.com/the-gear/graphql-scalars/commit/221c277))
- **build:** fix release script task ([49ca3ba](https://github.com/the-gear/graphql-scalars/commit/49ca3ba))
- **build:** remove ts from peer dependencies ([3ef99d4](https://github.com/the-gear/graphql-scalars/commit/3ef99d4))
- **config:** improve externals config type ([dd4026e](https://github.com/the-gear/graphql-scalars/commit/dd4026e))
- **config:** tweak migrate scripts ([edd733e](https://github.com/the-gear/graphql-scalars/commit/edd733e))
- **config:** update ts-jest types import ([9d3daab](https://github.com/the-gear/graphql-scalars/commit/9d3daab))
- **lint:** remove rules clashing with prettier ([40e1116](https://github.com/the-gear/graphql-scalars/commit/40e1116))
- **npm-scripts:** copy updated files after build>standard-version during release ([7146b15](https://github.com/the-gear/graphql-scalars/commit/7146b15))
- **npm-scripts:** rename commit to cz so husky wont run precommit twice ([248a570](https://github.com/the-gear/graphql-scalars/commit/248a570))
- **npm-scripts:** typo in pre release script name ([8f5fae4](https://github.com/the-gear/graphql-scalars/commit/8f5fae4))
- **npm-scripts:** use proper npm variable for targeting main path in 'size' command ([7fc44b1](https://github.com/the-gear/graphql-scalars/commit/7fc44b1))
- **precommit:** properly call prettier ([9d14f0f](https://github.com/the-gear/graphql-scalars/commit/9d14f0f))
- **scripts:** don't handle exclude within migrate ([30fa98f](https://github.com/the-gear/graphql-scalars/commit/30fa98f))
- remove dot files from gitignore ([e292c53](https://github.com/the-gear/graphql-scalars/commit/e292c53))
- **scripts:** remove ats-loader and sort-pkg-json ([2e16c3f](https://github.com/the-gear/graphql-scalars/commit/2e16c3f))
- add \*.log to gitignore/npmignore ([502ab00](https://github.com/the-gear/graphql-scalars/commit/502ab00))
- add back npm publish to release script ([378d582](https://github.com/the-gear/graphql-scalars/commit/378d582))
- **scripts:** remove validade-commit-msg from pkg ([a8c0da0](https://github.com/the-gear/graphql-scalars/commit/a8c0da0))
- **ts:** remove test files from exclude field ([da65fa0](https://github.com/the-gear/graphql-scalars/commit/da65fa0))
- **ts-lint:** add tslint-config-prettier so tslint doesn't clash with prettier ([10a8524](https://github.com/the-gear/graphql-scalars/commit/10a8524))
- always set strict versions via npm or yarn ([eee2150](https://github.com/the-gear/graphql-scalars/commit/eee2150))
- make tests work on windows ([5650754](https://github.com/the-gear/graphql-scalars/commit/5650754))
- normalize umd bundle name after scope addition ([73ab65f](https://github.com/the-gear/graphql-scalars/commit/73ab65f))

### Features

- **build:** add environment aware builds with env helpers ([cd87599](https://github.com/the-gear/graphql-scalars/commit/cd87599))
- **build:** add rollup ([0674dea](https://github.com/the-gear/graphql-scalars/commit/0674dea))
- **build:** build package files to dist/ ([#70](https://github.com/the-gear/graphql-scalars/issues/70)) ([cc5cb78](https://github.com/the-gear/graphql-scalars/commit/cc5cb78))
- **build:** ditch webpack and use rollup for bundling ([0326a0e](https://github.com/the-gear/graphql-scalars/commit/0326a0e))
- **build:** update to webpack 3 with scope hoisting + enable experimental flat esm bundle ([#3](https://github.com/the-gear/graphql-scalars/issues/3)) ([baa63ba](https://github.com/the-gear/graphql-scalars/commit/baa63ba)), closes [#2](https://github.com/the-gear/graphql-scalars/issues/2)
- **build:** use 3 new standard formats for shipping libraries ([fdd413e](https://github.com/the-gear/graphql-scalars/commit/fdd413e))
- **config:** replace validate-commit-msg with commitlint ([4bb58bc](https://github.com/the-gear/graphql-scalars/commit/4bb58bc))
- **lint:** add ordered-imports rule ([d6d0eff](https://github.com/the-gear/graphql-scalars/commit/d6d0eff))
- **lint:** remove prefer-method-signature as methods don't have proper contravariant checks ([77de4dd](https://github.com/the-gear/graphql-scalars/commit/77de4dd)), closes [/github.com/Microsoft/TypeScript/issues/25296#issuecomment-401882830](https://github.com//github.com/Microsoft/TypeScript/issues/25296/issues/issuecomment-401882830)
- **npm-scripts:** run only tests for affected files in prepush and exit immediately if some tests f ([d4316b4](https://github.com/the-gear/graphql-scalars/commit/d4316b4))
- **scripts:** add ability to use --first-release on release script ([c94694a](https://github.com/the-gear/graphql-scalars/commit/c94694a))
- **scripts:** add preflight check what files will be published ([71a615b](https://github.com/the-gear/graphql-scalars/commit/71a615b))
- **scripts:** add size script to get gzipped build size for umd bundle ([d25138a](https://github.com/the-gear/graphql-scalars/commit/d25138a))
- **scripts:** provide migration script from v3 to v4 ([c6c5b75](https://github.com/the-gear/graphql-scalars/commit/c6c5b75))
- **scripts:** update migrate script to match latest stack ([ec93c6a](https://github.com/the-gear/graphql-scalars/commit/ec93c6a))
- **test:** add jest-typeahead ([6659ff6](https://github.com/the-gear/graphql-scalars/commit/6659ff6))
- **test:** add setup-tests file for jest ([6c4a822](https://github.com/the-gear/graphql-scalars/commit/6c4a822))
- **ts-lint:** provide nice error output ([c66b4f7](https://github.com/the-gear/graphql-scalars/commit/c66b4f7))
- **tsc:** enable esnext modules for import() support ([d0261c4](https://github.com/the-gear/graphql-scalars/commit/d0261c4))
- **tsc:** exclude tests as ts-jest compiles them now ([2a543fb](https://github.com/the-gear/graphql-scalars/commit/2a543fb))
- **tslint:** add new rules from tslint-etc ([b956c23](https://github.com/the-gear/graphql-scalars/commit/b956c23))
- **tslint:** revamp tslint rules ([e16ce5b](https://github.com/the-gear/graphql-scalars/commit/e16ce5b))
- **vscode:** add vscode settings nad recommendet plugins ([0f5fc80](https://github.com/the-gear/graphql-scalars/commit/0f5fc80))
- add default License as MIT ([5711237](https://github.com/the-gear/graphql-scalars/commit/5711237))
- **webpack:** determine the name library name for umd build from package json ([8d970bd](https://github.com/the-gear/graphql-scalars/commit/8d970bd))
- add docs generation via typedoc ([b59f2b6](https://github.com/the-gear/graphql-scalars/commit/b59f2b6))
- add strong type checking ([860e500](https://github.com/the-gear/graphql-scalars/commit/860e500))
- add types ([c789f17](https://github.com/the-gear/graphql-scalars/commit/c789f17))
- add unit testing and coverage support via jest ([0551a52](https://github.com/the-gear/graphql-scalars/commit/0551a52))
- migrate to prettier and bump deps ([999043e](https://github.com/the-gear/graphql-scalars/commit/999043e))
- revamp whole starter and make it up to date ([#46](https://github.com/the-gear/graphql-scalars/issues/46)) ([2b8e74f](https://github.com/the-gear/graphql-scalars/commit/2b8e74f))

### Reverts

- **tsc:** remove exclude as it breaks lint-staged ([c2d0a52](https://github.com/the-gear/graphql-scalars/commit/c2d0a52))

### BREAKING CHANGES

- New Types added
- **build:** Webpack is not used anymore for bundling. Long live Rollup !
- **build:** **Before:**

when releasing a package all distribution files were produced on root of the project which clobers working tree and makes you constatnly update gitignore and npmignore and cleanup npm script if you wanna change anything. That was rather cumbersome.

**After:**
Now package files are created and moved to dist/ folder with tweaked package.json which removes all unnecessary metadata information and keeps only what is important for cunsumer ( author infor, git repo, dependencies and peerDependencies ).

During release npm script will 'cd dist' and from there it executes npm publish.

- Before all tooling config used to be in root, now it's within config/ folder which
  is typecheked and provides intellisense -> better DX. With this all npm-script tasks are provided
  with --config flag to resolve it properly.

# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
