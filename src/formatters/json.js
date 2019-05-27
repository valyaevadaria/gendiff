export default (ast) => {
  const result = JSON.stringify(ast, null, '  ');
  return result;
};
