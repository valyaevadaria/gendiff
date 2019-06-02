const getValue = v => ((v instanceof Object) ? '[complex value]' : v);

const getPlain = (ast) => {
  const iter = (tree, level) => {
    const text = tree.reduce((acc, object) => {
      const path = `${level}${object.key}`;
      switch (object.type) {
        case 'children':
          return [...acc, `${iter(object.children, `${path}.`).join('\n')}`];
        case 'added':
          return [...acc, `Property '${path}' was added with value: ${getValue(object.value)}`];
        case 'deleted':
          return [...acc, `Property '${path}' was removed`];
        case 'common':
          return acc;
        case 'changed':
          return [...acc, `Property '${path}' was updated. From ${getValue(object.oldValue)} to ${getValue(object.newValue)}`];
        default:
          throw new Error(`Type ${object.type} is incorrect!`);
      }
    }, []);
    return text;
  };

  return iter(ast, '').join('\n');
};

export default getPlain;
