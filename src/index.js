import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';

const cheking = [
  {
    check: (key, firstObj) => !_.has(firstObj, key),
    getMean: (key, firstObj, secondObj) => `  + ${key}: ${secondObj[key]}\n`,
  },
  {
    check: (key, firstObj, secondObj) => !_.has(secondObj, key),
    getMean: (key, firstObj) => `  - ${key}: ${firstObj[key]}\n`,
  },
  {
    check: (key, firstObj, secondObj) => firstObj[key] === secondObj[key],
    getMean: (key, firstObj) => `  ${key}: ${firstObj[key]}\n`,
  },
  {
    check: (key, firstObj, secondObj) => firstObj[key] !== secondObj[key],
    getMean: (key, firstObj, secondObj) => `  - ${key}: ${firstObj[key]}\n  + ${key}: ${secondObj[key]}\n`,
  },
];

const getDiff = (key, obj1, obj2) => cheking.find(({ check }) => check(key, obj1, obj2));

const getData = (file) => {
  const readFile = fs.readFileSync(file);
  const format = path.extname(file);

  const funcOfParser = getParser(format);
  const getObject = funcOfParser(readFile);

  return getObject;
};

const genDiff = (file1, file2) => {
  const obj1 = getData(file1);
  const obj2 = getData(file2);

  const keysOfObj1 = Object.keys(obj1);
  const keysOfObj2 = Object.keys(obj2);
  const allKeys = _.union(keysOfObj1, keysOfObj2);

  const result = allKeys.reduce((acc, key) => {
    const { getMean } = getDiff(key, obj1, obj2);
    return acc + getMean(key, obj1, obj2);
  }, '');

  return `{\n${result}  }`;
};

export default genDiff;
