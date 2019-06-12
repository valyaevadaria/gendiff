import stylish from './stylish';
import plain from './plain';
import json from './json';

const formats = {
  stylish,
  plain,
  json,
};

export default (format = 'stylish') => formats[format];
