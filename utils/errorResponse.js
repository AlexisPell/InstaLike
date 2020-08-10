// Custom error handling with 2 params
class ErrorResponce extends Error {
	constructor(message, statusCode) {
		super(message)
		this.statusCode = statusCode
	}
}

module.exports = ErrorResponce
