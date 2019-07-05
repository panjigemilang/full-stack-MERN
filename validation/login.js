const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validateLogininput(data) {
  let errors = {}
  data.email = !isEmpty(data.email) ? data.email : ""
  data.password = !isEmpty(data.password) ? data.password : ""

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid"
  }

  if (
    !validator.isLength(data.email, {
      min: 2,
      max: 30
    })
  ) {
    errors.email = "Email must be between 2 or 30 characters"
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required"
  }

  if (
    !validator.isLength(data.password, {
      min: 2,
      max: 30
    })
  ) {
    errors.password = "Password must be between 2 or 30 characters"
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
