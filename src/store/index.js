import reducer from '../reducers/';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();
export default function configureStore(initState) {
	const store = createStore(
		reducer,
		initState,
		applyMiddleware(logger, sagaMiddleware)
	);
	sagaMiddleware.run(rootSaga);
	return store;
}
