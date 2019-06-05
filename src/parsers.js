import yaml from 'js-yaml';
import ini from 'ini';

const formatsList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default format => formatsList[format];
