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

How to begin using:

1. npm install
2. Connect to Mongo in atlas
3. In folder /config, create file config.env
4. Set up config.env with following lines of code:
   NODE_ENV=development
   PORT=5000
   MONGO_URI=Your_link_to_connect_db //Connect DB
   JWT_SECRET=somerandomtexttocreatejwt
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
5. Done! Be free to use auth, private routes and create some REST APIs
