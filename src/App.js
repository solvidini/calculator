import React from 'react';

import Calculator from './containers/Calculator';

function App() {
  return (
    <div className="app">
      <Calculator />
      <div className="app__caption">
        Calculator by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://samuelk.pl/"
          className="link"
        >
          Samuel Kędziora
        </a>
      </div>
    </div>
  );
}

export default App;
