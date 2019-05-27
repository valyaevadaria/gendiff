import general from './general';
import plain from './plain';
import json from './json';

export default (format = 'general') => {
  const formats = {
    general,
    plain,
    json,
  };
  return formats[format];
};
