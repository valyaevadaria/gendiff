import _ from 'lodash';

const tab = n => '  '.repeat(n);

const stringify = (value, level) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const str = [...Object.keys(value)]
    .map(key => `${tab(level + 1)}  ${key}: ${value[key]}`);
  return `{\n${str}\n${tab(level)}}`;
};

const getGeneral = (ast) => {
  const iter = (tree, level) => {
    const text = tree.map((object) => {
      const value = stringify(object.value, level + 1);
      switch (object.type) {
        case 'child':
          return `${tab(level)}  ${object.key}: {\n${_.flatten(iter(object.child, level + 2)).join('\n')}\n${tab(level + 1)}}`;
        case 'new':
          return `${tab(level)}+ ${object.key}: ${value}`;
        case 'delete':
          return `${tab(level)}- ${object.key}: ${value}`;
        case 'general':
          return `${tab(level)}  ${object.key}: ${value}`;
        case 'change':
          return [`${tab(level)}- ${object.key}: ${stringify(object.oldValue, level + 1)}`, `${tab(level)}+ ${object.key}: ${stringify(object.newValue, level + 1)}`];
        default:
          break;
      }
    });
    return text;
  };

  return `{\n${_.flatten(iter(ast, 1)).join('\n')}\n}`;
};

export default getGeneral;
