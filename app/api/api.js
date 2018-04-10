import Http from 'react-native-http-module'

export default class Api {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    call = (path, method, params = {}, headers = {}) => {
        return Http.call(`${this.baseURL}/${path}`, method, params, headers)
    }

    get = (path, params, headers) => {
        return this.call(path, 'GET', params, headers)
    }

    post = (path, params, headers) => {
        return this.call(path, 'POST', params, headers)
    }

    postJson = (path, params, headers) => {
        return this.call(path, 'POST', params, {...headers, 'Content-Type': 'application/json'})
    }

    put = (path, params, headers) => {
        return this.call(path, 'PUT', params, headers)
    }

    patch = (path, params, headers) => {
        return this.call(path, 'PATCH', params, headers)
    }

    delete = (path, params, headers) => {
        return this.call(path, 'DELETE', params, headers)
    }
}