import React from 'react';
import ReactDOM from 'react-dom';
import ClickCounter from './ClickCounter';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ClickCounter />, document.getElementById('root'));
registerServiceWorker();
