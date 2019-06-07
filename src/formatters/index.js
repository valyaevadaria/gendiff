import defaultRenderer from './default-renderer';
import plain from './plain-renderer';
import json from './json-renderer';

const formats = {
  defaultRenderer,
  plain,
  json,
};

export default (format = 'defaultRenderer') => formats[format];
