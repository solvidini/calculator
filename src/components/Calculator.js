import React, { useState } from 'react';

import Control from './Control';
import { addBrackets, negate } from '../utils/corrects';

const Calculator = (props) => {
  const [n1, setN1] = useState('0');
  const [n2, setN2] = useState(null);
  const [result, setResult] = useState(null);
  const [operator, setOperator] = useState(null);
  const [operation, setOperation] = useState('');
  const [lastSign, setLastSign] = useState(null);
  const [percentageMode, setPercentageMode] = useState(false);
  const [error, setError] = useState(false);

  console.log('n1: ' + n1);
  console.log('n2: ' + n2);
  console.log('operator: ' + operator);
  console.log('result: ' + result);
  console.log('last sign: ' + lastSign);
  console.log('------------------');

  const actionHandler = (sign) => {
    switch (sign) {
      case '%':
        // PERCENTAGE
        if (
          operator &&
          n2 &&
          lastSign !== '=' &&
          lastSign !== 'N' &&
          lastSign !== '%' &&
          lastSign !== ',' &&
          Number(n1) !== 0
        ) {
          calculate('%');
          setPercentageMode(true);
          setOperation((previousValue) => previousValue + '%');
        }
        break;
      case 'N':
        // NEGATE
        let negateResult;
        if (!result && n2 !== 0) {
          setN2((previousValue) => previousValue * -1);
          setOperation(negate(operation, lastSign, n2));
          break;
        }
        if (n1 !== 0) {
          if (lastSign === '=' || lastSign === '%') {
            negateResult = n1 * -1;
          } else {
            negateResult = calculate() * -1;
          }
          setPercentageMode(false);
          setResult(negateResult);
          setN1(negateResult);
          setOperator(null);
          setN2(null);
          setOperation(negate(operation, lastSign));
        }
        break;
      case 'C':
        // RESET
        setPercentageMode(false);
        setN1('0');
        setN2(null);
        setOperation('');
        setOperator(null);
        setResult(null);
        break;
      case ',':
        // ADD DECIMAL POINT
        if (n1 === '0') {
          setOperation('0,');
          setN1('0.');
          break;
        }
        if (
          lastSign === '/' ||
          lastSign === 'x' ||
          lastSign === '-' ||
          lastSign === '+' ||
          lastSign === '%'
        ) {
          break;
        }
        if (lastSign === '=' || lastSign === 'N') {
          if (String(n1).includes('.')) {
            break;
          }
          setPercentageMode(false);
          setOperation(result + ',');
          setN1(n1 + '.');
          setResult(null);
          setN2(null);
          setOperator(null);
          break;
        }
        if (!operator && lastSign !== ',') {
          if (String(n1).includes('.')) {
            break;
          }
          setN1((previousValue) => {
            return previousValue + '.';
          });
          setOperation((previousValue) => {
            return previousValue + sign;
          });
        } else if (operator && lastSign !== ',') {
          if (String(n2).includes('.')) {
            break;
          }
          setN2((previousValue) => {
            if (previousValue === null) {
              return 0;
            }
            return previousValue + '.';
          });
          setOperation((previousValue) => {
            return previousValue + sign;
          });
        }
        break;
      case '=':
        // RESULT
        if (
          lastSign === '/' ||
          lastSign === 'x' ||
          lastSign === '-' ||
          lastSign === '+' ||
          (!n2 && !operator)
        ) {
          break;
        }
        if (percentageMode) {
          calculate('%');
          setOperation(
            (previousValue) =>
              previousValue + ' ' + operator + ' ' + n2 + '%'
          );
        } else {
          if (lastSign === '=' && n2) {
            setOperation((previousValue) => {
              return previousValue + ' ' + operator + ' ' + n2;
            });
          }
          if (operation.charAt(operation.length - 1) === ',') {
            setOperation(operation.slice(0, -1));
          }
          if (String(n2).charAt(String(n2).length - 1) === '.') {
            setN2(Number(String(n2).slice(0, -1)));
          }
          calculate();
        }
        break;
      case '/':
      case 'x':
      case '-':
      case '+':
        // OPERATORS
        if (operator === '/' && Number(n2) === 0) {
          calculate();
          break;
        }
        if (n1 === '0') {
          setOperator(sign);
          setOperation('0 ' + sign + ' ');
          break;
        }
        if (n2) {
          setN2(null);
        }
        if (
          lastSign === '/' ||
          lastSign === 'x' ||
          lastSign === '-' ||
          lastSign === '+' ||
          (lastSign === ',' &&
            operation.charAt(operation.length - 1) === ',')
        ) {
          let newOperation;
          if (lastSign === ',') {
            newOperation = operation.slice(0, -1);
          } else {
            newOperation = operation.slice(0, -3);
          }
          setOperation(addBrackets(newOperation, sign));
          setOperator(sign);
          if (percentageMode) {
            setPercentageMode(false);
          } else {
            calculate();
          }
          setN2(null);
          break;
        }
        if (n2 !== null && lastSign !== '=') {
          if (percentageMode) {
            setPercentageMode(false);
          } else {
            calculate();
          }
          setN2(null);
        }
        setOperator(sign);
        setOperation(addBrackets(operation, sign));
        break;
      default:
        // NUMBERS
        setPercentageMode(false);
        if (
          (lastSign === '=' || lastSign === 'N' || lastSign === '%') &&
          n1 !== '0'
        ) {
          setOperation(n1 + String(sign));
          setN1(n1 + String(sign));
          setResult(null);
          setN2(null);
          setOperator(null);
          break;
        }
        if (result) {
          setResult(null);
          setN2(sign);
          setOperation((previousValue) => {
            return previousValue + sign;
          });
        } else if (!operator) {
          if (n1 === 0 && lastSign === 0) {
            break;
          }
          setN1((previousValue) => {
            if (previousValue === '0') {
              return sign;
            }
            return previousValue + String(sign);
          });
          setOperation((previousValue) => {
            return previousValue + sign;
          });
        } else if (operator) {
          if (n2 === 0 && sign === 0) {
            break;
          }
          setN2((previousValue) => {
            if (previousValue === null) {
              return sign;
            }
            return previousValue + String(sign);
          });
          setOperation((previousValue) => {
            return previousValue + String(sign);
          });
        }
    }
    // TO PREVENT OPERATORS DUPLICATION IN OPERATIONS
    if (
      ((lastSign === '/' ||
        lastSign === 'x' ||
        lastSign === '-' ||
        lastSign === '+') &&
        sign === ',') ||
      ((lastSign === '/' ||
        lastSign === 'x' ||
        lastSign === '-' ||
        lastSign === '+') &&
        sign === '=')
    ) {
      setLastSign('+');
    } else {
      setLastSign(sign);
    }
  };

  const calculate = (operatorArg) => {
    let result;
    if (operatorArg === '%') {
      if (operator === '+') {
        result = +n1 + (n2 / 100) * n1;
      } else if (operator === '-') {
        result = +n1 - (n2 / 100) * n1;
      } else if (operator === 'x') {
        result = +n1 * (n2 / 100);
      } else if (operator === '/') {
        result = +n1 / (n2 / 100);
      }
      setN1(result);
      setResult(result);
    } else if (n2 !== null && operator) {
      switch (operator) {
        case '/':
          if (Number(n2) === 0) {
            setError(true);
            setOperation('Error! Cannot divide by 0.');
            setN1('0');
            setN2(null);
            setOperator(null);
            setResult(null);
            break;
          }
          result =
            +Math.round((+n1 / +n2 + Number.EPSILON) * 1000000000) /
            1000000000;
          setN1(result);
          setResult(result);
          break;
        case 'x':
          result =
            +Math.round((+n1 * +n2 + Number.EPSILON) * 1000000000) /
            1000000000;
          setN1(result);
          setResult(result);
          break;
        case '-':
          result =
            +Math.round((+n1 - +n2 + Number.EPSILON) * 1000000000) /
            1000000000;
          setN1(result);
          setResult(result);
          break;
        case '+':
        default:
          result =
            +Math.round((+n1 + +n2 + Number.EPSILON) * 1000000000) /
            1000000000;
          setN1(result);
          setResult(result);
      }
    } else {
      result = n1;
      setResult(n1);
    }
    return result;
  };

  return (
    <div className="calculator">
      <div className="calculator__result">
        <div className="calculator__operation">{operation}</div>
        <div className="calculator__result-value">
          {result !== null ? result : n2 ? n2 : n1}
        </div>
      </div>
      <div className="calculator__controls">
        <Control
          onClick={() => actionHandler('%')}
          modifier="basic"
          title="%"
        />
        <Control
          onClick={() => actionHandler('N')}
          modifier="basic"
          title={
            <div className="negation">
              <div className="negation__up">+</div>
              <div>/</div>
              <div className="negation__down">-</div>
            </div>
          }
        />
        <Control
          onClick={() => actionHandler('C')}
          modifier="basic"
          title="C"
        />
        <Control
          onClick={() => actionHandler('/')}
          modifier="violet-1"
          title="/"
        />
        <Control
          onClick={() => actionHandler(7)}
          modifier="basic"
          title="7"
        />
        <Control
          onClick={() => actionHandler(8)}
          modifier="basic"
          title="8"
        />
        <Control
          onClick={() => actionHandler(9)}
          modifier="basic"
          title="9"
        />
        <Control
          onClick={() => actionHandler('x')}
          modifier="violet-2"
          title="x"
        />
        <Control
          onClick={() => actionHandler(4)}
          modifier="basic"
          title="4"
        />
        <Control
          onClick={() => actionHandler(5)}
          modifier="basic"
          title="5"
        />
        <Control
          onClick={() => actionHandler(6)}
          modifier="basic"
          title="6"
        />
        <Control
          onClick={() => actionHandler('-')}
          modifier="violet-3"
          title="-"
        />
        <Control
          onClick={() => actionHandler(1)}
          modifier="basic"
          title="1"
        />
        <Control
          onClick={() => actionHandler(2)}
          modifier="basic"
          title="2"
        />
        <Control
          onClick={() => actionHandler(3)}
          modifier="basic"
          title="3"
        />
        <Control
          onClick={() => actionHandler('+')}
          modifier="violet-4"
          title="+"
        />
        <Control
          onClick={() => actionHandler(0)}
          modifier="basic"
          title="0"
        />
        <Control
          onClick={() => actionHandler(',')}
          modifier="basic"
          title=","
        />
        <Control
          onClick={() => actionHandler('=')}
          modifier="pink"
          title="="
        />
      </div>
    </div>
  );
};

export default Calculator;
