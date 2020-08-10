const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middleware/error')
const mongoDB = require('./config/db')

const app = express()

// Env
dotenv.config({ path: './config/config.env' })

// Connect DB
mongoDB()

// Route files
const auth = require('./routes/auth')
const profiles = require('./routes/profiles')

// Init middleware
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate limiting
app.use(
	rateLimit({
		windowMs: 10 * 60 * 1000, //10 minutes
		max: 100,
	})
)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(cors())

// Cookie parser
app.use(cookieParser())

// Mounte routes
app.use('/api/auth', auth)
app.use('/api/profile', profiles)

// Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
	PORT,
	console.log(`Server is running on port ${PORT}`.blue.bold)
)

process.on('unhandleRejection', (err, promise) => {
	console.log(`Error: ${err.message}`)
	// Close server and exit process
	// server.close(() => process.exit(1))
})
