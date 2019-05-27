/* eslint-disable no-undef */
import fs from 'fs';
import genDiff from '../src';

const testList = [
  ['general', 'before.json', 'after.json', 'result.txt'],
  ['general', 'before.yml', 'after.yml', 'result.txt'],
  ['general', 'before.ini', 'after.ini', 'result.txt'],
  ['plain', 'before.json', 'after.json', 'result-plain.txt'],
  ['json', 'before.ini', 'after.ini', 'result-json.txt'],
  ['general', '__trees__/before.json', '__trees__/after.json', '__trees__/result.txt'],
  ['general', '__trees__/before.yml', '__trees__/after.yml', '__trees__/result.txt'],
  ['general', '__trees__/before.ini', '__trees__/after.ini', '__trees__/result.txt'],
  ['plain', '__trees__/before.json', '__trees__/after.json', '__trees__/result-plain.txt'],
  ['json', '__trees__/before.ini', '__trees__/after.ini', '__trees__/result-json.txt'],
];

test.each(testList)('gendiff %s %s %s', (format, bef, af, res) => {
  const before = `__tests__/__fixtures__/${bef}`;
  const after = `__tests__/__fixtures__/${af}`;
  const result = fs.readFileSync(`__tests__/__fixtures__/${res}`, 'utf8');

  expect(genDiff(format, before, after)).toEqual(result);
});
