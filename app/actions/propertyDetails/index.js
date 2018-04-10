/**
 * Created by waqas.bhatti on 10/04/2018.
 */
/**
 * Created by waqas.bhatti on 15/03/2018.
 */
import Api from '../../api'

export const GET_PROPERTY_DETAILS_REQUEST = 'GET_PROPERTY_DETAILS_REQUEST';
export const GET_PROPERTY_DETAILS_SUCCESS = 'GET_PROPERTY_DETAILS_SUCCESS';
export const GET_PROPERTY_DETAILS_FAILURE = 'GET_PROPERTY_DETAILS_FAILURE';
// import {
//     GET_PROPERTY_DETAILS_REQUEST,
//     GET_PROPERTY_DETAILS_SUCCESS,
//     GET_PROPERTY_DETAILS_FAILURE,
// } from '../../constants'

import { normalize } from 'normalizr'
import propertyDetails from '../../schemas/propertyDetails'

export const getPropertyDetails = (propertyId) => {
    return async dispatch => {
        dispatch({
            type: GET_PROPERTY_DETAILS_REQUEST,
            propertyId
        })

        let url = `/search/properties/${propertyId}`
        try {
            let response = await Api.get(url)
            let normalizedData = normalize(response, propertyDetails)
            dispatch({type: GET_PROPERTY_DETAILS_SUCCESS,propertyId, normalizedData})
        } catch (error) {
            dispatch({type: GET_PROPERTY_DETAILS_FAILURE, propertyId, error})
        }
    }
}