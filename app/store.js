/**
 * Created by waqas.bhatti on 10/04/2018.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../app/reducers/index'; //Import the reducer

// Connect our store to the reducers
export default createStore(reducers, applyMiddleware(thunk));