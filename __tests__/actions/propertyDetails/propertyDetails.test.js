/**
 * Created by waqas.bhatti on 06/04/2018.
 */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

export const GET_PROPERTY_DETAILS_REQUEST = 'GET_PROPERTY_DETAILS_REQUEST';
export const GET_PROPERTY_DETAILS_SUCCESS = 'GET_PROPERTY_DETAILS_SUCCESS';
export const GET_PROPERTY_DETAILS_FAILURE = 'GET_PROPERTY_DETAILS_FAILURE';

import {getPropertyDetails } from '../../../app/actions'
import  propertyDetailsMockData  from './../../../__mocks__/getPropertyDetailsMock.json'
import { normalize } from 'normalizr'
import propertyDetails from '../../../app/schemas/propertyDetails'
// import fetchMock from 'fetch-mock'
// import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// const store = configureStore(rootReducer)
describe('async actions', () => {
    beforeEach(() => {
        fetch.resetMocks()
    })

    it('creates GET_PROPERTY_DETAILS_REQUEST when getting details', () => {

        // fetchMock
        //     .getOnce('/property/1853633', { body: propertyDetailsMockData, headers: { 'content-type': 'application/json' } })



        let normalizedData = normalize(propertyDetailsMockData, propertyDetails)
        // fetch.mockResponse(propertyDetailsMockData)
        const initialState = {}
        // console.log(propertyDetails)
        //fetch.mockResponse(normalizedData)
        const store = mockStore({propertyDetails:initialState})

        console.log("actions are:"+store.getActions())
        const expectedActions = [
            { type: GET_PROPERTY_DETAILS_REQUEST, propertyId:"1853633" },
            { type: GET_PROPERTY_DETAILS_SUCCESS,  propertyId:"1853633", propertyDetailsMockData}
        ]


        return store.dispatch(getPropertyDetails('1853633')).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
