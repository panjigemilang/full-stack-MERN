const isEmpty = require('./is-empty');
const validator = require('validator');

module.exports = function validateLogininput(data) {
    let err = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!validator.isEmail(data.email)) {
        err.email = "Email is invalid";
    }

    if (!validator.isLength(data.email, {
            min: 2,
            max: 30
        })) {
        err.email = "Email must be between 2 or 30 characters";
    }

    if (validator.isEmpty(data.email)) {
        err.email = "Email field is required";
    }

    if (!validator.isLength(data.password, {
            min: 2,
            max: 30
        })) {
        err.password = "Email must be between 2 or 30 characters";
    }

    if (validator.isEmpty(data.password)) {
        err.password = "Password field is required";
    }

    return {
        err,
        isValid: isEmpty(err)
    }
}