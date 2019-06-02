import _ from 'lodash';

const cheking = [
  {
    check: (key, firstObj, secondObj) => (firstObj[key] instanceof Object) && (secondObj[key] instanceof Object),
    getMean: (key, firstObj, secondObj, fn) => ({ type: 'children', key, children: fn(firstObj[key], secondObj[key]) }),
  },
  {
    check: (key, firstObj) => !_.has(firstObj, key),
    getMean: (key, firstObj, secondObj) => ({ type: 'added', key, value: secondObj[key] }),
  },
  {
    check: (key, firstObj, secondObj) => !_.has(secondObj, key),
    getMean: (key, firstObj) => ({ type: 'deleted', key, value: firstObj[key] }),
  },
  {
    check: (key, firstObj, secondObj) => firstObj[key] === secondObj[key],
    getMean: (key, firstObj) => ({ type: 'common', key, value: firstObj[key] }),
  },
  {
    check: (key, firstObj, secondObj) => firstObj[key] !== secondObj[key],
    getMean: (key, firstObj, secondObj) => ({
      type: 'changed', key, oldValue: firstObj[key], newValue: secondObj[key],
    }),
  },
];

const getDiff = (key, obj1, obj2) => cheking.find(({ check }) => check(key, obj1, obj2));

const getAST = (obj1, obj2) => {
  const keysOfObj1 = Object.keys(obj1);
  const keysOfObj2 = Object.keys(obj2);
  const allKeys = _.union(keysOfObj1, keysOfObj2);

  const result = allKeys.map((key) => {
    const { getMean } = getDiff(key, obj1, obj2);
    return getMean(key, obj1, obj2, getAST);
  });

  return result;
};

export default getAST;
