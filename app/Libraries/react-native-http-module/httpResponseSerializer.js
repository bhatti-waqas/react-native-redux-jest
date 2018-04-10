import ResponseSerializer from './responseSerializer'
import HttpError from './httpError'
import {
    HttpHeaderContentLengthKey,
    HttpHeaderContentTypeKey,
    HttpMimeTypeJson,
    HttpMimeTypeForm,
    HttpGetMethod,
    HttpPostMethod,
    HttpPutMethod,
    HttpPatchMethod,
    HttpDeleteMethod,
} from './constants'

let defaultConfiguration = {
    acceptedStatusCodes: [ 200, 201 ],
    errorKeys: [ 'error_description', 'error', 'message', 'Message', 'error_message' ]
}

export default class HttpResponseSerializer extends ResponseSerializer {
    constructor(props) {
        super()

        let { acceptedStatusCodes, errorKeys } = {
            ...defaultConfiguration,
            ...props
        }

        this.acceptedStatusCodes = acceptedStatusCodes
        this.errorKeys = errorKeys
    }

    parse = async (response) => {
        let contentType = response.headers.get(HttpHeaderContentTypeKey)
        let isJson = contentType && contentType.match(/application|text\/json/)
        let userInfo = null
        if (isJson) {
            userInfo = await response.json()
        } else {
            if (response.blob) {
                let blob = await response.blob()
                userInfo = await new Promise((resolve, reject)=>{
                    let fileReader = new FileReader()
                    fileReader.onload = function(){
                        resolve(this.result)
                    }
                    fileReader.readAsText(blob, "ISO-8859-1")
                })
            } else {
                userInfo = await response.text()
            }
        }
        if (this.acceptedStatusCodes.includes(response.status)) {
            return userInfo
        } else if (response.status === 504) {
            this.error = HttpError('timed out', response.status, userInfo)
        } else if (response.status === 403) {
            this.error = HttpError(userInfo.error, response.status, userInfo)
        } else {
            let errorFromHeader = response.headers.get("WWW-Authenticate")
            if (errorFromHeader) {
                this.error = HttpError(errorFromHeader, response.status, userInfo)
            } else {
                if (isJson) {
                    for (let key in this.errorKeys) {
                        let errMessage = userInfo[this.errorKeys[key]]
                        if (errMessage) {
                            this.error = HttpError(errMessage, response.status, userInfo)
                            break
                        }
                    }
                    if (!this.error) {
                        this.error = HttpError('', response.status, userInfo)
                    }
                }
                else {
                    this.error = HttpError(userInfo, response.status, userInfo)
                }
            }
        }
    }
}