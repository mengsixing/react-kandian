import React from 'react'
import ReactDOM from 'react-dom'
import App from './router/router'
import { observable } from 'mobx'
import { Provider } from 'mobx-react'
import registerServiceWorker from './registerServiceWorker'

//定义全局状态
var appState = observable({
    number: 0
})

ReactDOM.render(
    <Provider appState={appState}>
        <App />
    </Provider>
    , document.getElementById('root'))
registerServiceWorker()
