import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './router/router';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/index'
import 'antd-mobile/lib/date-picker/style/css';

// 创建 Redux 的 store 对象
const store = configureStore()
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
