import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducer from "./reducer.js";

import App from './components/App.jsx';

// необходимы экшены, которые:
// -получают слова с сервера
// -пробрасывают слово в буфер
// -дают команду на объединение буфера

// в редюсере необходимы обработчики, которые
// -кладет слово в selBuffer
// -объединяет selBuffer и sel
// -вливает sel и selBuffer в pageWords ( это действие необходимо после
// добавления слова в буфер, получения новых слов)


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
