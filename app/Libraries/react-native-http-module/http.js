export const HttpHeaderContentLengthKey = 'Content-Length'
export const HttpHeaderContentTypeKey = 'Content-Type'
export const HttpMimeTypeJson = 'application/json'
export const HttpMimeTypeForm = 'application/x-www-form-urlencoded'
export const HttpGetMethod = 'GET'
export const HttpPostMethod = 'POST'
export const HttpPutMethod = 'PUT'
export const HttpPatchMethod = 'PUT'
export const HttpDeleteMethod = 'DELETE'

import HttpResponseSerializer from './httpResponseSerializer'
import HttpError from './httpError';

function urlQuery(params) {
    let parts = []
    for (let key in params) {
        if (!Array.isArray(params[key])) {
            parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        } else {
            let object = params[key]
            for (const k in object) {
                parts.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(object[k])}`)
            }
        }
    }
    return parts.join('&')
}

const Http = {
    urlQuery,
    call: async (url, method = HttpGetMethod, options, headers = {'Accept': HttpMimeTypeJson, [HttpHeaderContentTypeKey]: HttpMimeTypeJson}) => {
        let isURL = url.match(/^(http|https):\/\//) !== null
        if (!isURL) {
            throw new Error('Missing url')
        }

        let requestOptions = {
            method,
            headers
        }

        if (method && (method.match(/^post|put|patch$/i))) {
            if (options && headers && headers[HttpHeaderContentTypeKey] === HttpMimeTypeForm) {
              requestOptions.body = urlQuery(options)
            }
            else if (options) {
              requestOptions.body = JSON.stringify(options)
            }
        } else if (method && method.match(/^get|delete$/i) && options) {
            url = `${url}?${urlQuery(options)}`
        }

        /*
        Error handlings
        */
        
        const maxRequestCalls = 2
        let lastError = null
        let response = null
        let isJson = false
        for (let i=0; i<maxRequestCalls; i++) {
            let retry = false
            try {
                response = await fetch(url, requestOptions)
                let serializer = new HttpResponseSerializer({acceptedStatusCodes: [200]})
                let result = await serializer.parse(response)
                if (serializer.error) {
                    if (serializer.error.statusCode === 504) {
                        retry = true
                        throw HttpError('timed out', serializer.error.statusCode, serializer.error.userInfo)
                    } else if (serializer.error.statusCode === 403) {
                        retry = true
                    }
                    throw serializer.error
                }
                else {
                    return result
                }
            } catch (error) {
                lastError = error
                if (!retry) {
                    throw error
                }
            }
        }
        if (lastError) {
            throw lastError
        }
        else {
            throw Error('Unknow Error')
        }
    },
    get: (path, options, headers) => {
        return Http.call(path, HttpGetMethod, options, headers)
    },
    post: (path, options, headers) => {
        return Http.call(path, HttpPostMethod, options, headers)
    },
    put: (path, options, headers) => {
        return Http.call(path, HttpPutMethod, options, headers)
    },
    patch: (path, options, headers) => {
        return Http.call(path, HttpPatchMethod, options, headers)
    },
    delete: (path, options, headers) => {
        return Http.call(path, HttpDeleteMethod, options, headers)
    },
}

export default Http