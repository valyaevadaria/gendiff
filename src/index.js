import fs from 'fs';
import l from 'lodash';

const cheking = [
  {
    check: (key, firstObj) => !l.has(firstObj, key),
    getMean: (key, firstObj, secondObj) => `  + ${key}: ${secondObj[key]}\n`,
  },
  {
    check: (key, firstObj, secondObj) => !l.has(secondObj, key),
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

const genDiff = (file1, file2) => {
  const obj1 = JSON.parse(fs.readFileSync(file1));
  const obj2 = JSON.parse(fs.readFileSync(file2));

  const keysOfObj1 = Object.keys(obj1);
  const keysOfObj2 = Object.keys(obj2);
  const allKeys = l.union(keysOfObj1, keysOfObj2);

  const result = allKeys.reduce((acc, key) => {
    const { getMean } = getDiff(key, obj1, obj2);
    return acc + getMean(key, obj1, obj2);
  }, '');

  return `{\n${result}  }`;
};

export default genDiff;
