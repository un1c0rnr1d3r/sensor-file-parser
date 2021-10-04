# Sensor File Parser

Parses and evaluates the contents of a sensor file provided as a string.

## Usage

To use in a plain JavaScript environment, run:

```bash
npm install
npm run build
```

This builds to `/dist`.

The resulting JS file can be imported in plain JS using

`import { evaluateLogFile } from './dist';`

_or_

`const evaluateLogFile = require('./dist').evaluateLogFile;`

## Limitations

Sensor reading date validation is extremely primitive. There is limited detection for invalid dates and times. If sensor data is repeated with the same date and time those erroneous readings will be included in the evaluation.

Sensors with the same name but a different sensor type are not supported. This configuration will lead to unexpected behavior.

Sensor readings are interpreted as floating point values. This may cause inaccurate results for very large or very small sensor readings. Certain values may not be able to be represented precisely in memory and will be rounded to the nearest floating point value. See [Wikipedia IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) for more information.

## Design Suggestions

Accepting the input as a readable stream would allow for batch processing and enable us to handle much larger files or streaming input from disparate data sources.

Logging data for each sensor into a separate file would simplify parsing, prevent problems with multiple sensors writing to the file simultaneously, and potentially improve processing performance for very large files.

Including the sensor type as well as the name in the output would prevent potential confusion if two different types of sensors happen to share the same name.

Storing the sensor data in a relational, key-value, or document database could make it easier to manage incoming data from a large number of sensors and enable multiple clients to evaluate the sensor data separately before aggregating the results.

Using a library such as [mathjs](https://www.npmjs.com/package/mathjs) could enable more precise interpretation of sensor readings and mitigate the floating point issues mentioned in the Limitations section.

## Commands

TSDX scaffolds your new library inside `/src`.

To run TSDX, use:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

#### Setup Files

This is the folder structure we set up for you:

```txt
/src
  index.tsx       # EDIT THIS
/test
  blah.test.tsx   # EDIT THIS
.gitignore
package.json
README.md         # EDIT THIS
tsconfig.json
```

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.
