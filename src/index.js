import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import LangtonsLoop from './LangtonsLoop';

ReactDOM.render(<LangtonsLoop width={Math.floor(window.innerWidth / 10)} height={Math.floor(window.innerHeight / 10)}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
