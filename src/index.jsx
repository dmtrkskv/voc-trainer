import './styles/main.scss';
import './styles/pagination.scss';
import './styles/react-swipe.scss';
import './styles/card.scss';
import './styles/nav.scss';
import './styles/button.scss';
import './styles/bar.scss';
import './styles/selection-tab.scss';
import './styles/learning-tab.scss';
import './styles/check-tab.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducer from "./reducer.js";

import App from './components/App.jsx';

window.clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
