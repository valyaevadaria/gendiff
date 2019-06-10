import renderer from './renderer';
import plain from './plain';
import json from './json';

const formats = {
  renderer,
  plain,
  json,
};

export default (format = 'renderer') => formats[format];
