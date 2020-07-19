export const addBrackets = (operation, sign) => {
  if (
    (operation.includes('+') || operation.includes('-')) &&
    (sign === 'x' || sign === '/')
  ) {
    if (operation.charAt(operation.length - 2) === ')') {
      return operation + ' ' + sign + ' ';
    }
    let newOperation = '(' + operation + ')  ' + sign + ' ';
    return newOperation;
  }
  return operation + ' ' + sign + ' ';
};

export const negate = (operation) => {
  if (
    operation.includes('+') ||
    operation.includes('-') ||
    operation.includes('x') ||
    operation.includes('/')
  ) {
    let newOperation = '- (' + operation + ')';
    return newOperation;
  }
  return '- ' + operation;
};
