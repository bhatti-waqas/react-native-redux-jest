/**
 * Created by waqas.bhatti on 10/04/2018.
 */
import { combineReducers } from 'redux';

import { DATA_AVAILABLE } from "../actions/data" //Import the actions types constant we defined in our actions

// import { DATA_AVAILABLE } from "../actions/"

import propertyDetails  from '../reducers/propertyDetails/index'



let dataState = { data: [], loading:true };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            state = Object.assign({}, state, { data: action.data, loading:false });
            return state;
        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer,
    propertyDetails,
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;