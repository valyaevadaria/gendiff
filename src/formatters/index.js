import standart from './standartFormat';
import plain from './plain';
import json from './json';

const formats = {
  standart,
  plain,
  json,
};

export default (format = 'standart') => formats[format];
