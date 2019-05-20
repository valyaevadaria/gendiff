import yaml from 'js-yaml';

export default (format) => {
  const formatsList = {
    '.json': JSON.parse,
    '.yml': yaml.safeLoad,
  };
  return formatsList[format];
};
