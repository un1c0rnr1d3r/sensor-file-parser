import { evaluateLogFile } from '../src';
import {
  example,
  noisyData,
  noReadings,
  noReference,
  noSensor,
  repeatedIdentifiers,
  variableReference,
} from '../fixture';

describe('evaluateLogFile', () => {
  it('works with the sample input provided', () => {
    const actual = evaluateLogFile(example);
    const expected = {
      'temp-1': 'precise',
      'temp-2': 'ultra precise',
      'hum-1': 'keep',
      'hum-2': 'discard',
      'mon-1': 'keep',
      'mon-2': 'discard',
    };

    expect(actual).toEqual(expected);
  });

  it('detects when no reference data is present', () => {
    const actual = evaluateLogFile(noReference);
    const expected = {};

    expect(actual).toEqual(expected);
  });

  it('detects when no sensor is present', () => {
    const actual = evaluateLogFile(noSensor);
    const expected = {
      'temp-2': 'ultra precise',
      'hum-1': 'keep',
      'mon-1': 'keep',
    };

    expect(actual).toEqual(expected);
  });

  it('detects when no readings present', () => {
    const actual = evaluateLogFile(noReadings);
    const expected = {
      'temp-1': 'precise',
      'hum-1': 'keep',
      'mon-1': 'keep',
    };

    expect(actual).toEqual(expected);
  });

  it('works with noisy file data', () => {
    const actual = evaluateLogFile(noisyData);
    const expected = {
      'temp-1': 'precise',
      'hum-1': 'keep',
      'hum-2': 'discard',
      'mon-1': 'keep',
      'mon-2': 'discard',
    };

    expect(actual).toEqual(expected);
  });

  it('works with a variable reference environment', () => {
    const actual = evaluateLogFile(variableReference);
    const expected = {
      'temp-1': 'precise',
      'temp-2': 'very precise',
      'hum-1': 'keep',
      'hum-2': 'keep',
      'mon-1': 'keep',
      'mon-2': 'keep',
    };

    expect(actual).toEqual(expected);
  });

  it('works with repeated sensor identifiers', () => {
    const actual = evaluateLogFile(repeatedIdentifiers);
    const expected = {
      'temp-1': 'precise',
      'temp-2': 'very precise',
      'hum-1': 'discard',
      'hum-2': 'keep',
      'mon-1': 'discard',
      'mon-2': 'keep',
    };

    expect(actual).toEqual(expected);
  });
});
