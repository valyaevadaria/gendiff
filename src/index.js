import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';
import getAST from './ast';
import getFormat from './formatters';

const getData = (file) => {
  const readFile = fs.readFileSync(file, 'utf-8');
  const format = path.extname(file);

  const funcOfParser = getParser(format);
  const getObject = funcOfParser(readFile);

  return getObject;
};

const genDiff = (format, file1, file2) => {
  const obj1 = getData(file1);
  const obj2 = getData(file2);

  const ast = getAST(obj1, obj2);
  const toFormat = getFormat(format);
  return toFormat(ast);
};

export default genDiff;
