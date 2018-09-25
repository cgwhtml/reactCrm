import React from 'react';
import ReactDOM from 'react-dom';



import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';


//react-redux
import {Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';

//国际化--中文
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import 'moment/src/locale/zh-cn';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

let store = createStore(todoApp);

ReactDOM.render(
    <Provider store={store} >
        <LocaleProvider locale={zh_CN}>
            <App />
        </LocaleProvider >
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();