/* eslint-disable no-undef */
import fs from 'fs';
import genDiff from '../src';

test('test json', () => {
  const before = '__tests__/__fixtures__/before.json';
  const after = '__tests__/__fixtures__/after.json';
  const result = fs.readFileSync('__tests__/__fixtures__/result-json.txt', 'utf8');

  expect(genDiff(before, after)).toEqual(result);
});

test('test yaml', () => {
  const before = '__tests__/__fixtures__/before.yml';
  const after = '__tests__/__fixtures__/after.yml';
  const result = fs.readFileSync('__tests__/__fixtures__/result-yaml.txt', 'utf8');

  expect(genDiff(before, after)).toEqual(result);
});
