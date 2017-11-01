import reducer from '../reducers/'
import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export default function configureStore(initState){
    const store = createStore(reducer,initState,applyMiddleware(thunk,logger));
    return store;
}