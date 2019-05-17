/* eslint-disable no-undef */
import fs from 'fs';
import genDiff from '../src';

test('test of step 2', () => {
  const before = '__tests__/__fixtures__/before.json';
  const after = '__tests__/__fixtures__/after.json';
  const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');

  expect(genDiff(before, after)).toEqual(result);
});
