/** Simple demo Express app. */

const express = require("express");
const { findMean, findMedian, findMode } = require("./stats")
const { convertStrNums } = require("./utils")
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res, next) {
  if (!req.query.nums) {
    return next(new BadRequestError(message = "nums are required"));
  }
  let strNums = req.query.nums;
  let intNums = convertStrNums(strNums.split(','))

  if (intNums instanceof BadRequestError) return next(intNums);

  let result = findMean(intNums);

  return res.json({ response: { operation: "mean", value: result } });
})


/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res, next) {
  if (!req.query.nums) {
    return next(new BadRequestError(message = "nums are required"));
  }
  let strNums = req.query.nums;
  let intNums = convertStrNums(strNums.split(','))

  if (intNums instanceof BadRequestError) return next(intNums);
  let result = findMedian(intNums);

  return res.json({ response: { operation: "median", value: result } });
})


/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get("/mode", function (req, res, next) {
  if (!req.query.nums) {
    return next(new BadRequestError(message = "nums are required"));
  }
  let strNums = req.query.nums;
  let intNums = convertStrNums(strNums.split(','))

  if (intNums instanceof BadRequestError) return next(intNums);
  let result = findMode(intNums);

  return res.json({ response: { operation: "mode", value: result } });
})


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;