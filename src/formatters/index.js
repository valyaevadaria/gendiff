import common from './common';
import plain from './plain';
import json from './json';

export default (format = 'common') => {
  const formats = {
    common,
    plain,
    json,
  };
  return formats[format];
};
