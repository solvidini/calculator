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

export const negate = (operation, lastSign) => {
  let newOperation = operation;
  if (
    lastSign === '/' ||
    lastSign === 'x' ||
    lastSign === '-' ||
    lastSign === '+' ||
    (lastSign === ',' && operation.charAt(operation.length - 1) === ',')
  ) {
    if (lastSign === ',') {
      newOperation = newOperation.slice(0, -1);
    } else {
      newOperation = newOperation.slice(0, -3);
    }
  }
  if (
    newOperation.includes('+') ||
    newOperation.includes('-') ||
    newOperation.includes('x') ||
    newOperation.includes('/')
  ) {
    newOperation = '- (' + newOperation + ')';
    return newOperation;
  }
  return '- ' + newOperation;
};
