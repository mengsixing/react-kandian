import reducer from '../reducers/'
import {createStore} from 'redux'

export default function configureStore(initState){
    const store = createStore(reducer,initState);
    return store;
}