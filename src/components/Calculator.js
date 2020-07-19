import React, { useState } from 'react';

import Control from './Control';
import {
  correctLastSign,
  addBrackets,
  negate,
} from '../utils/corrects';

const Calculator = (props) => {
  const [n1, setN1] = useState('0');
  const [n2, setN2] = useState(null);
  const [operation, setOperation] = useState('');
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [lastSign, setLastSign] = useState(null);

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
        if (result) {
          setResult((previousValue) => {
            return previousValue / 100;
          });
          setN1((previousValue) => {
            return previousValue / 100;
          });
        } else if (n2) {
          setN2((previousValue) => {
            return previousValue / 100;
          });
        } else {
          setN1((previousValue) => {
            return previousValue / 100;
          });
        }
        break;
      case 'S':
        // NEGATE
        const negateResult = calculate() * (-1);
        setResult(negateResult);
        setN1(negateResult);
        setN2(null);
        setOperation(negate(operation));
        break;
      case 'C':
        // RESET
        setN1('0');
        setN2(null);
        setOperation('');
        setOperator(null);
        setResult(null);
        break;
      case ',':
        // ADD DECIMAL POINT
        if (
          lastSign === '/' ||
          lastSign === 'x' ||
          lastSign === '-' ||
          lastSign === '+'
        ) {
          break;
        } else if (lastSign === '=') {
          if (String(n1).includes('.')) {
            break;
          }
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
        // OPERATION RESULT
        if (
          lastSign === '/' ||
          lastSign === 'x' ||
          lastSign === '-' ||
          lastSign === '+'
        ) {
          break;
        }
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
        break;
      case '/':
      case 'x':
      case '-':
      case '+':
        // OPERATORS
        if (
          correctLastSign(
            lastSign,
            operation,
            setOperation,
            setOperator,
            sign
          )
        ) {
          calculate();
          setN2(null);
          break;
        }
        if (n2 && lastSign !== '=') {
          calculate();
          setN2(null);
        }
        setOperator(sign);
        setOperation(addBrackets(operation, sign));
        break;
      default:
        // NUMBERS
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
          if (n2 === 0 && lastSign === 0) {
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

  const calculate = () => {
    let result;
    if (n2 !== null && operator) {
      switch (operator) {
        case '/':
          if (Number(n2) === 0) {
            setOperation('Error! Cannot divide by 0.');
            setN1(0);
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
          onClick={() => actionHandler('S')}
          modifier="basic"
          title="+/-"
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
