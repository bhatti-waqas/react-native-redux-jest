/**
 * Created by waqas.bhatti on 10/04/2018.
 */
/**
 * Created by waqas.bhatti on 15/03/2018.
 */
import { fromJS } from 'immutable'

export const GET_PROPERTY_DETAILS_REQUEST = 'GET_PROPERTY_DETAILS_REQUEST';
export const GET_PROPERTY_DETAILS_SUCCESS = 'GET_PROPERTY_DETAILS_SUCCESS';
export const GET_PROPERTY_DETAILS_FAILURE = 'GET_PROPERTY_DETAILS_FAILURE';

const initialState = fromJS({

})

const propertyDetails = (state = initialState, action) => {
    switch(action.type) {
        case GET_PROPERTY_DETAILS_SUCCESS:
            let data = fromJS(action.normalizedData.entities.properties)
            return state.merge(data)
        default:
            return state
    }
}

export default propertyDetails