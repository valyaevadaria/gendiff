import fs from 'fs';
import genDiff from '../src';

const testList = [
  ['defaultRenderer', 'before.json', 'after.json', 'result.txt'],
  ['defaultRenderer', 'before.yml', 'after.yml', 'result.txt'],
  ['defaultRenderer', 'before.ini', 'after.ini', 'result.txt'],
  ['plain', 'before.json', 'after.json', 'result-plain.txt'],
  ['json', 'before.ini', 'after.ini', 'result-json.txt'],
  ['defaultRenderer', '__trees__/before.json', '__trees__/after.json', '__trees__/result.txt'],
  ['defaultRenderer', '__trees__/before.yml', '__trees__/after.yml', '__trees__/result.txt'],
  ['defaultRenderer', '__trees__/before.ini', '__trees__/after.ini', '__trees__/result.txt'],
  ['plain', '__trees__/before.json', '__trees__/after.json', '__trees__/result-plain.txt'],
  ['json', '__trees__/before.ini', '__trees__/after.ini', '__trees__/result-json.txt'],
];

test.each(testList)('gendiff %s %s %s', (format, bef, af, res) => {
  const before = `__tests__/__fixtures__/${bef}`;
  const after = `__tests__/__fixtures__/${af}`;
  const result = fs.readFileSync(`__tests__/__fixtures__/${res}`, 'utf8');
  expect(genDiff(before, after, format)).toEqual(result);
});
