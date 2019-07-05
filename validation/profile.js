const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validateProfileinput(data) {
  let errors = {}
  data.handle = !isEmpty(data.handle) ? data.handle : ""
  data.status = !isEmpty(data.status) ? data.status : ""
  data.skills = !isEmpty(data.skills) ? data.skills : ""

  if (
    !validator.isLength(data.handle, {
      min: 2,
      max: 40
    })
  ) {
    errors.handle = "Handle must between 2 or 40 characters"
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required"
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Status field is required"
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skills field is required"
  }

  if (!isEmpty(data.github)) {
    let regex = /[./,";'{}()`~]/
    if (regex.test(data.github)) {
      errors.github =
        "github username is not valid. can't resolve special characters"
    }
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "URL is not valid"
    }
  }

  if (!isEmpty(data.linkedin)) {
    let regex = /(https:)/
    if (!validator.isURL(data.linkedin) && regex.test(data.linkedin)) {
      errors.linkedin = "linkedin URL is not valid"
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "instagram URL is not valid"
    }
  }

  if (!isEmpty(data.dribbble)) {
    if (!validator.isURL(data.dribbble)) {
      errors.dribbble = "dribbble URL is not valid"
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "youtube URL is not valid"
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "facebook URL is not valid"
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "twitter URL is not valid"
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
