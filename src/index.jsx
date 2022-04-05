import React from 'react';
import ReactDOM from 'react-dom';

import Contexts from './services';
import App from './App';

ReactDOM.render(
  <Contexts>
    <App />
  </Contexts>,
  document.getElementById('root')
);