export default (n1, n2, operator, callback, isPercentageMode) => {
  let result;
  if (isPercentageMode) {
    if (operator === '+') {
      result = +n1 + (n2 / 100) * n1;
      result =
        Math.round((result + Number.EPSILON) * 1000000000) / 1000000000;
    } else if (operator === '-') {
      result = +n1 - (n2 / 100) * n1;
      result =
        Math.round((result + Number.EPSILON) * 1000000000) / 1000000000;
    } else if (operator === 'x') {
      result = +n1 * (n2 / 100);
      result =
        Math.round((result + Number.EPSILON) * 1000000000) / 1000000000;
    } else if (operator === '/') {
      if (Number(n2) === 0) {
        throw new Error('Cannot divide by 0!');
      }
      result = +n1 / (n2 / 100);
      result =
        Math.round((result + Number.EPSILON) * 1000000000) / 1000000000;
    }
  } else if (n2 !== null && operator) {
    switch (operator) {
      case '/':
        if (Number(n2) === 0) {
          throw new Error('Cannot divide by 0!');
        }
        result =
          +Math.round((+n1 / +n2 + Number.EPSILON) * 1000000000) /
          1000000000;
        break;
      case 'x':
        result =
          +Math.round((+n1 * +n2 + Number.EPSILON) * 1000000000) /
          1000000000;
        break;
      case '-':
        result =
          +Math.round((+n1 - +n2 + Number.EPSILON) * 1000000000) /
          1000000000;
        break;
      case '+':
      default:
        result =
          +Math.round((+n1 + +n2 + Number.EPSILON) * 1000000000) /
          1000000000;
    }
  }
  callback(result);
};
