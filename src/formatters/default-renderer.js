import _ from 'lodash';

const tab = n => '  '.repeat(n);

const stringify = (value, level) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const str = Object.keys(value)
    .map(key => `${tab(level + 1)}  ${key}: ${value[key]}`);
  return `{\n${str}\n${tab(level)}}`;
};

const getDefaultRenderer = (ast) => {
  const iter = (tree, level) => {
    const text = tree.map((object) => {
      const value = stringify(object.value, level + 1);
      switch (object.type) {
        case 'children':
          return `${tab(level)}  ${object.key}: {\n${iter(object.children, level + 2).join('\n')}\n${tab(level + 1)}}`;
        case 'added':
          return `${tab(level)}+ ${object.key}: ${value}`;
        case 'deleted':
          return `${tab(level)}- ${object.key}: ${value}`;
        case 'common':
          return `${tab(level)}  ${object.key}: ${value}`;
        case 'changed':
          return `${tab(level)}- ${object.key}: ${stringify(object.oldValue, level + 1)}\n${tab(level)}+ ${object.key}: ${stringify(object.newValue, level + 1)}`;
        default:
          throw new Error(`Type ${object.type} is incorrect!`);
      }
    });
    return text;
  };

  return `{\n${_.flattenDeep(iter(ast, 1)).join('\n')}\n}`;
};

export default getDefaultRenderer;
