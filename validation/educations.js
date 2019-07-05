const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validateEducationsinput(data) {
  let errors = {}
  data.institution = !isEmpty(data.institution) ? data.institution : ""
  data.degree = !isEmpty(data.degree) ? data.degree : ""
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : ""
  data.from = !isEmpty(data.from) ? data.from : ""

  if (validator.isEmpty(data.institution)) {
    errors.institution = "Institution name field is required"
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Status degree field is required"
  }

  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study field is required"
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From date field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
