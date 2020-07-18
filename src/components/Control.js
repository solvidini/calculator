import React from 'react';

const Control = (props) => {
  const controlClasses = ['calculator__button'];

  if (props.modifier) {
    controlClasses.push('calculator__button--' + props.modifier);
  }

  return (
    <div onClick={props.onClick} className={controlClasses.join(' ')}>
      <span>{props.title}</span>
    </div>
  );
};

export default Control;
