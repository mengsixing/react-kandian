import reducer from '../reducers/'
import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/sagas'

const sagaMiddleware = createSagaMiddleware()
export default function configureStore(initState){
    const store = createStore(reducer,initState,applyMiddleware(thunk,logger,sagaMiddleware));
    sagaMiddleware.run(rootSaga)
    return store;
}