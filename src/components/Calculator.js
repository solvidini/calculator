import React, { useState } from 'react';

import Control from './Control';

const Calculator = (props) => {
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(null);
  const [operation, setOperation] = useState('');
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);

  console.log('lol');

  const actionHandler = (sign) => {
    switch (sign) {
      case '%':
        console.log('%');
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
        setN2(0);
        setOperation('');
        setOperator(null);
        setResult(null);
        break;
      case '/':
        setOperator('/');
        break;
      case '*':
        setOperator('*');
        break;
      case '-':
        setOperator('-');
        break;
      case '+':
        setOperator('+');
        break;
      case ',':
        console.log(',');
        break;
      case '=':
        // OPERATION RESULT
        calculate();
        break;
      default:
        if (Number.isInteger(sign) && !operator) {
          setN1((previousValue) => {
            if (previousValue === 0) {
              return String(sign);
            }
            return previousValue + String(sign);
          });
        } else if (Number.isInteger(sign) && operator) {
          setN2((previousValue) => {
            if (previousValue === null) {
              return String(sign);
            }
            return previousValue + String(sign);
          });
        }
    }
  };

  const calculate = () => {
    let result;
    switch (operator) {
      case '/':
        result = n1 / n2;
        setN1(result);
        setResult(result);
        break;
      case '*':
        result = n1 * n2;
        setN1(result);
        setResult(result);
        break;
      case '-':
        result = n1 - n2;
        setN1(result);
        setResult(result);
        break;
      case '+':
      default:
        result = n1 + n2;
        setN1(result);
        setResult(result);
    }
  };

  return (
    <div className="calculator">
      <div className="calculator__result">
        {result ? result : n2 ? n2 : n1}
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
          onClick={() => actionHandler('*')}
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
