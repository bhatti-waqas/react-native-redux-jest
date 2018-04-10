class HttpError extends Error {
    constructor(message, statusCode, userInfo) {
        super(message)
        this.statusCode = statusCode
        this.userInfo = userInfo
    }
}

export default (...params) => {
    return new HttpError(...params)
}