import yaml from 'js-yaml';
import ini from 'ini';

export default (format) => {
  const formatsList = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  return formatsList[format];
};
