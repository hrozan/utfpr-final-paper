const createError = require("http-errors")
const express = require("express")
const logger = require("morgan")
const cors = require("cors")

const routes = require("./routes")

const app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
})

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get("env") === "development" ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.json({ message: "Error" })
})

module.exports = app
