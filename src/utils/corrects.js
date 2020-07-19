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
};
