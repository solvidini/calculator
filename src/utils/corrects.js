export const addBrackets = (operation, sign) => {
  if (
    (operation.includes('+') || operation.includes('-')) &&
    (sign === 'x' || sign === '/')
  ) {
    if (
      operation.charAt(operation.length - 2) === ')' &&
      operation.charAt(operation.length - 1) === '%'
    ) {
      return '(' + operation + ')  ' + sign + ' ';
    }
    if (operation.charAt(operation.length - 2) === ')') {
      return operation + ' ' + sign + ' ';
    }
    return '(' + operation + ')  ' + sign + ' ';
  }
  if (
    operation.charAt(operation.length - 2) === ')' &&
    operation.charAt(operation.length - 1) !== '%'
  ) {
    let newOperation =
      operation.substring(1).slice(0, -2) + ' ' + sign + ' ';
    return newOperation;
  }
  return operation + ' ' + sign + ' ';
};

export const negate = (operation, lastSign, n2) => {
  let newOperation = operation;
  if (n2) {
    if (/(\(- \d+\))$|(\(- \d+.\d+\))$/.test(operation)) {
      console.log(true);
      newOperation = newOperation.replace(
        /(\(- \d+\))$|(\(- \d+.\d+\))$/,
        `${Math.abs(n2)}`
      );
    } else {
      newOperation = newOperation.replace(
        new RegExp(String(n2) + '$'),
        `(- ${Math.abs(n2)})`
      );
    }
    return newOperation;
  }
  if (
    lastSign === '/' ||
    lastSign === 'x' ||
    lastSign === '-' ||
    lastSign === '+' ||
    (lastSign === '.' && operation.charAt(operation.length - 1) === '.')
  ) {
    if (lastSign === '.') {
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
