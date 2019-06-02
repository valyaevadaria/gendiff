import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getAST from './ast';
import getFormat from './formatters';

const getData = (file) => {
  const readFile = fs.readFileSync(file, 'utf-8');
  const format = path.extname(file);

  const parser = getParser(format);
  const getObject = parser(readFile);

  return getObject;
};

const genDiff = (firstPath, secondPath, format) => {
  const obj1 = getData(firstPath);
  const obj2 = getData(secondPath);

  const ast = getAST(obj1, obj2);
  const toFormat = getFormat(format);
  return toFormat(ast);
};

export default genDiff;
