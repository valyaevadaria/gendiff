/* eslint-disable no-undef */
import fs from 'fs';
import genDiff from '../src';

const testList = [
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
];

test.each(testList)('gendiff %s %s', (bef, af) => {
  const before = `__tests__/__fixtures__/${bef}`;
  const after = `__tests__/__fixtures__/${af}`;
  const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');

  expect(genDiff(before, after)).toEqual(result);
});
