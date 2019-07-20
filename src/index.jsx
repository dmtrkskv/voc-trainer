import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import './styles/main.scss';

window.clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
