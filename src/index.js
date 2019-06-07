import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getAST from './ast';
import getFormat from './formatters';

const getData = (pathToFile) => {
  const data = fs.readFileSync(pathToFile, 'utf-8');
  const format = path.extname(pathToFile);

  const parse = getParser(format);
  const getObject = parse(data);

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
