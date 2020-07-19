import React, { useState } from 'react';

import Control from './Control';
import { correctLastSign } from '../utils/corrects';

const Calculator = (props) => {
  const [n1, setN1] = useState(0);
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
        // CHANGE SIGN
        if (result) {
          setResult((previousValue) => {
            return previousValue * -1;
          });
          setN1((previousValue) => {
            return previousValue * -1;
          });
        } else if (n2) {
          setN2((previousValue) => {
            return previousValue * -1;
          });
        } else {
          setN1((previousValue) => {
            return previousValue * -1;
          });
        }
        break;
      case 'C':
        // RESET
        setN1(0);
        setN2(null);
        setOperation('');
        setOperator(null);
        setResult(null);
        break;
      case '/':
        if (
          correctLastSign(
            lastSign,
            operation,
            setOperation,
            setOperator,
            '/'
          )
        ) {
          break;
        }
        if (operator) {
          calculate();
          setN2(null);
        }
        setOperator('/');
        setOperation((previousValue) => {
          return previousValue + ' ' + sign + ' ';
        });
        break;
      case 'x':
        if (
          correctLastSign(
            lastSign,
            operation,
            setOperation,
            setOperator,
            'x'
          )
        ) {
          break;
        }
        if (operator) {
          calculate();
          setN2(null);
        }
        setOperator('x');
        setOperation((previousValue) => {
          return previousValue + ' x ';
        });
        break;
      case '-':
        if (
          correctLastSign(
            lastSign,
            operation,
            setOperation,
            setOperator,
            '-'
          )
        ) {
          break;
        }
        if (operator) {
          calculate();
          setN2(null);
        }
        setOperator('-');
        setOperation((previousValue) => {
          return previousValue + ' ' + sign + ' ';
        });
        break;
      case '+':
        if (
          correctLastSign(
            lastSign,
            operation,
            setOperation,
            setOperator,
            '+'
          )
        ) {
          break;
        }
        if (operator) {
          calculate();
          setN2(null);
        }
        setOperator('+');
        setOperation((previousValue) => {
          return previousValue + ' ' + sign + ' ';
        });
        break;
      case ',':
        if (!n2 && !operator && lastSign !== ',') {
          if (
            lastSign === '/' ||
            lastSign === 'x' ||
            lastSign === '-' ||
            lastSign === '+'
          ) {
            const newOperation = operation.slice(0, -3);
            setOperation(newOperation + ',');
          }
          if (n1.includes('.')) {
            break;
          }
          setN1((previousValue) => {
            if (previousValue === 0) {
              return 0;
            }
            return previousValue + '.';
          });
          setOperation((previousValue) => {
            return previousValue + sign;
          });
        } else if (n2 !== null && operator && lastSign !== ',') {
          if (
            lastSign === '/' ||
            lastSign === 'x' ||
            lastSign === '-' ||
            lastSign === '+'
          ) {
            const newOperation = operation.slice(0, -3);
            setOperation(newOperation + ',');
          }
          if (n2.includes('.')) {
            break;
          }
          setN2((previousValue) => {
            if (previousValue === null || previousValue === 0) {
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
        if (lastSign === '=') {
          setOperation((previousValue) => {
            return previousValue + operator + n2;
          });
        }
        calculate();
        break;
      default:
        if (result) {
          if (Number.isInteger(sign) && operator) {
            setN2(sign);
            setOperation((previousValue) => {
              return previousValue + sign;
            });
          }
        } else {
          if (Number.isInteger(sign) && !operator) {
            setN1((previousValue) => {
              if (previousValue === 0) {
                return String(sign);
              }
              return previousValue + String(sign);
            });
            setOperation((previousValue) => {
              return previousValue + sign;
            });
          } else if (Number.isInteger(sign) && operator) {
            setN2((previousValue) => {
              if (previousValue === null || previousValue === 0) {
                return String(sign);
              }
              return previousValue + String(sign);
            });
            setOperation((previousValue) => {
              return previousValue + sign;
            });
          }
        }
    }
    setLastSign(sign);
  };

  const calculate = () => {
    let result;
    if (!isNaN(n2) && operator) {
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
          result = +n1 / +n2;
          setN1(result);
          setResult(result);
          break;
        case 'x':
          result = +n1 * +n2;
          setN1(result);
          setResult(result);
          break;
        case '-':
          result = +n1 - +n2;
          setN1(result);
          setResult(result);
          break;
        case '+':
        default:
          result = +n1 + +n2;
          setN1(result);
          setResult(result);
      }
    } else {
      setResult(n1);
    }
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
