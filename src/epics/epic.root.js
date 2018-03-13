import * as clicknumTypes from '../actionTypes/clicknum'

const incrementAsync = (action$, store) => {
  return action$.ofType(clicknumTypes.INCREMENT_ASYNC)
    .delay(1000)
    .mapTo({ type: clicknumTypes.CHANGE_NUMBER });
}


export default incrementAsync
