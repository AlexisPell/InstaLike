Instagram Look Like app:
Here is the main goal of this app is to clear out the current level of owning such technologies,
like React-Redux, NodeJs, MongoDB, Express with all the following tools along the way.

The architecture of app considering:

1. Have Logging, Registrating,
2. Possibility to create your own profile, include main photo to it. Check other's profiles.
3. Create posts with Picture, text, comments and likes. No dislikes awailable.
4. Check Tape of all Posts of all users/ or only some user's posts.

This project contains the following structure:

// Template description:
// 1. Setup project using dotenv config
// 2. Morgan middleware shows up the exact route/ Colors added for console/
// 3. Mongoose connected already (only step- connect in config/config.env)
// 4. Mounted Model, route and controller for user/auth with register, login, protected routes
// 5. Added custom ErrorHandling Middleware
// 6. Added custom CORS handler
// 7. Added custom Async Middleware
// 8. Cors, xss-clean, helmet, hpp, mongoSanitize, rateLimit protection setup

// Project structure:
// /config for config.env and db.js
// /controllers for route methods
// /routes for routing
// /middlewares for async, error, auth handlers and so on
// /utils for another workflow .js files
