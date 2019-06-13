const isEmpty = require("./is-empty")
const validator = require("validator")

module.exports = function validateProfileinput(data) {
    let errors = {}
    data.handle = !isEmpty(data.handle) ? data.handle : ""
    data.status = !isEmpty(data.status) ? data.status : ""
    data.skills = !isEmpty(data.skills) ? data.skills : ""

    if (!validator.isLength(data.handle, {
            min: 2,
            max: 40
        })) {
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

    if (!isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = "URL is not valid"
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram = "instagram URL is not valid"
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!validator.isURL(data.linkedin)) {
            errors.linkedin = "linkedin URL is not valid"
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}