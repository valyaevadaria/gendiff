/* eslint-disable no-undef */
import fs from 'fs';
import genDiff from '../src';

const testList = [
  ['before.json', 'after.json', 'result.txt'],
  ['before.yml', 'after.yml', 'result.txt'],
  ['before.ini', 'after.ini', 'result.txt'],
  ['__trees__/before.json', '__trees__/after.json', '__trees__/result.txt'],
  ['__trees__/before.yml', '__trees__/after.yml', '__trees__/result.txt'],
  ['__trees__/before.ini', '__trees__/after.ini', '__trees__/result.txt'],
];

test.each(testList)('gendiff %s %s', (bef, af, res) => {
  const before = `__tests__/__fixtures__/${bef}`;
  const after = `__tests__/__fixtures__/${af}`;
  const result = fs.readFileSync(`__tests__/__fixtures__/${res}`, 'utf8');

  expect(genDiff(before, after)).toEqual(result);
});
