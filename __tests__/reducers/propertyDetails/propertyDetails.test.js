/**
 * Created by waqas.bhatti on 04/04/2018.
 */

import propertyDetailsReducer from '../../../app/reducers/propertyDetails'
import  propertyDetailsMockData  from '../../../__mocks__/getPropertyDetailsMock.json'
import { fromJS } from 'immutable'
export const GET_PROPERTY_DETAILS_REQUEST = 'GET_PROPERTY_DETAILS_REQUEST';
export const GET_PROPERTY_DETAILS_SUCCESS = 'GET_PROPERTY_DETAILS_SUCCESS';
export const GET_PROPERTY_DETAILS_FAILURE = 'GET_PROPERTY_DETAILS_FAILURE';

import { normalize } from 'normalizr'
import propertyDetails from '../../../app/schemas/propertyDetails'

describe('Property Details Reducer', () => {

    // let responseData = response[0]
    it('has a default state', () => {
        expect(propertyDetailsReducer(undefined, {type: 'unexpected'})).toEqual(fromJS({}))
    })
    it('has a GET_PROPERTY_DETAILS_SUCCESS state', () => {
        let normalizedData = normalize(propertyDetailsMockData, propertyDetails)
        let data = fromJS(normalizedData.entities.properties)
        expect(propertyDetailsReducer(fromJS({}), {type: GET_PROPERTY_DETAILS_SUCCESS, normalizedData})).toEqual(data)
    })

})

export default propertyDetails