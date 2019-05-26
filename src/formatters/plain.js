const checkValue = v => ((v instanceof Object) ? '[complex value]' : v);

const getPlain = (ast) => {
  const iter = (tree, level) => {
    const text = tree.reduce((acc, object) => {
      const path = `${level}${object.key}`;
      switch (object.type) {
        case 'child':
          return [...acc, `${iter(object.child, `${path}.`).join('\n')}`];
        case 'new':
          return [...acc, `Property '${path}' was added with value: ${checkValue(object.value)}`];
        case 'delete':
          return [...acc, `Property '${path}' was removed`];
        case 'general':
          return acc;
        case 'change':
          return [...acc, `Property '${path}' was updated. From ${checkValue(object.oldValue)} to ${checkValue(object.newValue)}`];
        default:
          break;
      }
    }, []);
    return text;
  };

  return iter(ast, '').join('\n');
};

export default getPlain;
