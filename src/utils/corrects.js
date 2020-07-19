export const correctLastSign = (
  lastSign,
  operation,
  setOperation,
  setOperator,
  sign
) => {
  if (
    lastSign === '/' ||
    lastSign === 'x' ||
    lastSign === '-' ||
    lastSign === '+'
  ) {
    const newOperation = operation.slice(0, -3);
    setOperation(newOperation + ' ' + sign + ' ');
    setOperator(sign);
    return true;
  } else if (lastSign === ',') {
    const newOperation = operation.slice(0, -1);
    setOperation(newOperation + ' ' + sign + ' ');
    setOperator(sign);
    return true;
  }
  return false;
};

export const addBrackets = (operation, sign) => {
  if (
    (operation.includes('+') || operation.includes('-')) &&
    (sign === 'x' || sign === '/')
  ) {
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
