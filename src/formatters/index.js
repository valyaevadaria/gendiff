import general from './general';
import plain from './plain';

export default (format = 'general') => {
  const formats = {
    general,
    plain,
  };
  return formats[format];
};
