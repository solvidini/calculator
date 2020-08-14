export const addBrackets = (operation, sign) => {
  let operationWithoutBrackets = '';
  let isBracket = false;

  for (let i = operation.length - 1; i >= 0; i--) {
    if (operation.charAt(i) === ')') isBracket = true;
    if (operation.charAt(i) === '(') {
      isBracket = false;
      continue;
    }
    if (!isBracket) operationWithoutBrackets += operation.charAt(i);
  }

  if (
    (operationWithoutBrackets.includes('+') ||
      operationWithoutBrackets.includes('-')) &&
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
    operation.charAt(0) === '-' &&
    operation.charAt(2) === '(' &&
    operation.charAt(operation.length - 2) === ')' &&
    operation.charAt(operation.length - 1) !== '%' &&
    (sign === '+' || sign === '-')
  ) {
    let newOperation =
      operation.substring(3).slice(0, -1) + ' ' + sign + ' ';
    return newOperation;
  }

  if (
    operation.charAt(0) === '(' &&
    operation.charAt(operation.length - 2) === ')' &&
    operation.charAt(operation.length - 1) !== '%' &&
    (sign === '+' || sign === '-')
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
