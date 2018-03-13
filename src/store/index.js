import reducer from '../reducers/'
import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'

import myRootEpic from '../epics/epic.root'
import { combineEpics } from 'redux-observable';
import { createEpicMiddleware } from 'redux-observable';

const rootEpic = combineEpics(
    myRootEpic
  );
  const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore(initState){
    const store = createStore(reducer,initState,applyMiddleware(logger,epicMiddleware));
    return store;
}
