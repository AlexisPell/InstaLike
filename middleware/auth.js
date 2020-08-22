const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponce = require('./../utils/errorResponse')
const User = require('./../models/User')

exports.protect = asyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1]
	}
	// Optional cookies include
	else if (req.cookies.token) {
		token = req.cookies.token
	}

	// Check if token exists
	if (!token) {
		return next(new ErrorResponce('Not authorized for this route...', 401))
	}

	// Verify token
	try {
		// decoded returns { id: ... , iat: ... , exp: ... }
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		req.user = await User.findById(decoded.id)

		next()
	} catch (err) {
		return next(new ErrorResponce('Not authorized for this route...', 401))
	}
})
