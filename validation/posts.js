const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validatePostsinput(data) {
  let errors = {}
  data.text = !isEmpty(data.text) ? data.text : ""

  if (validator.isEmpty(data.text)) {
    errors.text = "text field cannot be blank"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
