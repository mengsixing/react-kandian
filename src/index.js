import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './router/router';
import {observable} from 'mobx';
import {Provider} from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';


var appState = observable({
    number: 0
});

ReactDOM.render(
    <Provider appState={appState}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
