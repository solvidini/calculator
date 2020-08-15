import React from 'react';

const Result = (props) => {
  return (
    <div className="calculator__result">
      <div className="calculator__operation">
        {props.error ? props.error : props.operation}
      </div>
      <div className="calculator__result-value">
        {props.result !== null
          ? props.result
          : props.n2
          ? props.n2
          : props.n1}
      </div>
    </div>
  );
};

export default Result;
